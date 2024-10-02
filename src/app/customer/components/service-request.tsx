"use client";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import StepComponent from "./step";
import LayoutComponent from "../../global-components/layout";
import { toast } from "react-toastify";
import {
  AnswerCustomer,
  GetQuestionServices,
  ValidRequestCustomer,
} from "../../../../network/customer";
import Auth from "../../global-components/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../redux/slices/userSlices";
import dynamic from "next/dynamic";
const Datepicker = dynamic(async () => await import("./datepicker"), {
  ssr: false,
});
const Address = dynamic(async () => await import("./address"), {
  ssr: false,
});

export default function ServiceRequest({ idParams }: any) {
  const user = useSelector((state: any) => state.user?.user);
  const workMaster = useSelector((state: any) => state.workMaster?.workMaster);
  const [questionList, setQuestionList] = useState<any>([]);
  const [activeButton, setActiveButton] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [submitCode, setSubmitCode] = useState(false);
  const [submitData, setSubmitData] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  const [answersData, setAnswersData] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceTime, setServiceTime] = useState({} as any);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [code, setCode] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hasQuestionData, setHasQuestionData] = useState<any>(false);
  const [clickPrev, setClickPrev] = useState<any>(false);
  const [endClicked, setEndClicked] = useState<any>(false);
  const [selectAddress, setSelectAddress] = useState<any>();
  useEffect(() => {
    if (idParams > 0) {
      GetQuestionServices(idParams).then((response) => {
        setQuestionList(response.data);
      });
    }
  }, [idParams]);

  useEffect(() => {
    if (submitCode) {
      ValidRequestCustomer(phoneNumber).then((response) => {
        setQuestionList(response.data);
      });
    }
  }, [submitCode]);
  // useEffect(() => {
  //   dispatch(getUserInfo("service") as any);
  // }, []);

  useEffect(() => {
    const city: any = localStorage.getItem("city");
    const cityName: any = localStorage.getItem("cityName");
    const token: any = localStorage.getItem("token");
    if (
      idParams > 0 &&
      questionList.length &&
      endClicked &&
      answersData.length
    ) {
      if (token && user && Object.keys(user)?.length > 0) {
        const firstObject = {
          serviceId: idParams,
          serviceName: questionList[0]?.serviceName,
          customerName: user?.customerName,
          cityId: city,
          cityName: cityName,
          addressIdCustomer: selectAddress,
          dateForDoTheWork: serviceDate,
          timeForDoTheWork: serviceTime.from,
        };
        const data = [
          {
            answerItem: firstObject,
            answers: answersData,
          },
        ];
        AnswerCustomer(data)
          .then((response) => {
            setShowAddressModal(true);
          })
          .catch((error) => {
            toast.error("مشکلی پیش آمده...", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      } else if (Object.keys(workMaster)?.length > 0) {
        toast.error("لطفا با کاربری مشتری وارد شوید", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setShowLoginModal(true);
      }
    }
  }, [questionList, user, endClicked, answersData]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (code > 0 && submitData) {
      AnswerCustomer(answersData).then((response) => {
        setTimeout(() => {
          setSubmitCode(false);
        }, 500);
      });
    }
  }, [submitData]);
  const next = (action: string) => {
    if (hasQuestionData) {
      if (action !== "end") {
        setCurrent(current + 1);
        setClickPrev(true);
      } else {
        setCurrent(current + 1);
        setEndClicked(true);
        setClickPrev(true);
      }
      setActiveButton(true);
    }
  };
  return (
    <>
      <LayoutComponent />
      <div className="hero-section about gap padd-fix">
        <div className="container q-container">
          <div className="row align-items-center max-w-[100vw] mx-0 overflow-hidden w-[100%]">
            <div
              className="col-lg-12 parent-q"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="400"
            >
              <div className="parent-questions">
                <StepComponent
                  items={questionList}
                  setAnswersData={setAnswersData}
                  clickPrev={clickPrev}
                  setClickPrev={setClickPrev}
                  current={current}
                  hasQuestionData={hasQuestionData}
                  setHasQuestionData={setHasQuestionData}
                  endClicked={endClicked}
                  setActiveButton={setActiveButton}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full p-3 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0)] z-10">
        <div className="flex items-center justify-center">
          {current < questionList?.length - 1 && (
            <Button
              type="primary"
              disabled={activeButton}
              className="bag button w-full text-center max-w-[400px]"
              onClick={() => next("")}
            >
              بعدی
            </Button>
          )}

          {current === questionList?.length - 1 && (
            <Button
              type="primary"
              disabled={activeButton}
              className="bag button w-full text-center max-w-[400px]"
              onClick={() => next("end")}
            >
              تمام
            </Button>
          )}
          {/* {current > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              className="bag button"
              onClick={(e) => prev()}
            >
              قبلی
            </Button>
          )} */}
        </div>
      </div>
      {/* <FooterComponent /> */}
      <Address
        setShowAddressModal={setShowAddressModal}
        showAddressModal={showAddressModal}
        setShowPickerModal={setShowDatePicker}
        setSelectAddress={setSelectAddress}
        selectAddress={selectAddress}
      />
      <Datepicker
        setShowPickerModal={setShowDatePicker}
        showPickerModal={showDatePicker}
        setServiceDate={setServiceDate}
        serviceDate={serviceDate}
        setServiceTime={setServiceTime}
        serviceTime={serviceTime}
      />
      <Auth
        setShowLoginModal={setShowLoginModal}
        showLoginModal={showLoginModal}
        redirectTo={"sendReq"}
        setSubmitButton={setSubmitButton}
      />
    </>
  );
}

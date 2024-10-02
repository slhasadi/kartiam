"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  CountdownProps,
  Form,
  Input,
  RadioChangeEvent,
  Statistic,
} from "antd";
import { Radio } from "antd";
import { useRouter } from "next/navigation";
import ModalComponent from "../modal/modal";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  GenerateCustomerToken,
  GenerateWorkMasterToken,
  LoginCustomer,
} from "../../../../network/authenticate";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../redux/slices/userSlices";
import { ToastContainer, toast } from "react-toastify";
import { ShahkarInquiry } from "../../../../network/work-master";
import { onInputChange } from "../../../../utils/two-factor-auth";
import CostomInput from "../costom-input";
const Auth = ({
  showLoginModal,
  setShowLoginModal,
  redirectTo,
  setSubmitButton,
}: // setSubmitButton,
any) => {
  const user = useSelector((state: any) => state.user?.user);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [workMasterPhoneNumber, setWorkMasterPhoneNumber] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showErrorLog, setShowErrorLog] = useState("");
  const [submitCode, setSubmitCode] = useState(false);
  const [submitData, setSubmitData] = useState(false);
  const [customerLoginBtnClicked, setCustomerLoginBtnClicked] = useState(false);
  const [apiCustomerToken, setApiCustomerToken] = useState(false);
  const [apiWorkMasterToken, setApiWorkMasterToken] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [resendCode, setResendCode] = useState(false);
  const [activeAuthButton, setActiveAuthButton] = useState(false);
  const [userKind, setUserKind] = useState("Customer");
  const [code, setCode] = useState(0);
  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60);
  const [form] = Form.useForm();
  const [wmForm] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const towFactorValue = useRef(null) as any;
  const authInputes = useRef(null) as any;
  const { Countdown } = Statistic;

  useEffect(() => {
    if (
      phoneNumber.toString().length == 11 &&
      apiCustomerToken &&
      customerLoginBtnClicked
    ) {
      GenerateCustomerToken(phoneNumber).then((response) => {
        if (response.data == true) {
          setShowSubmitModal(true);
          setApiCustomerToken(false);
          setShowLoginModal(false);
          setDeadline(Date.now() + 1000 * 60);
        }
      });
    }
  }, [apiCustomerToken, phoneNumber, customerLoginBtnClicked]);
  useEffect(() => {
    if (workMasterPhoneNumber.toString().length == 11 && apiWorkMasterToken) {
      const data = {
        mobile: workMasterPhoneNumber,
        nationalCode: nationalCode,
      };
      GenerateWorkMasterToken(workMasterPhoneNumber)
        .then((response) => {
          localStorage.setItem("token", response.data);
          setApiWorkMasterToken(false);
          setShowLoginModal(false);
          router.push("/workmaster");
        })
        .catch((error) => {
          if (error?.response?.status == 400 || error?.code == "ERR_NETWORK") {
            // setShowLoginModal(false);
            setApiWorkMasterToken(false);
            toast.error("کاربری با این شماره یافت نشد", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
      // ShahkarInquiry(data)
      //   .then(() => {

      //   })
      //   .catch((err) => {
      //     if (err?.response?.status == 400) {
      //       setApiWorkMasterToken(false);
      //       toast.error("کد ملی با شماره همراه مطابقت ندارد", {
      //         position: "top-right",
      //         autoClose: 5000,
      //         hideProgressBar: true,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //         theme: "colored",
      //       });
      //     }
      //   });
    }
  }, [apiWorkMasterToken]);
  useEffect(() => {
    if (submitData) {
      setShowErrorLog("");
      LoginCustomer(phoneNumber, Number(twoFactorCode))
        .then((response) => {
          if (response.data) {
            setShowLoginModal(false);
            localStorage.setItem("token", response.data);
            if (redirectTo == "sendReq") {
              setShowSubmitModal(false);
              dispatch(getUserInfo("service") as any);
            } else {
              router.push("/customer");
            }
          }
        })
        .catch((error) => {
          if (error?.response?.status == 400 || error?.code == "ERR_NETWORK") {
            setShowErrorLog("کد وارد شده صحیح نیست");
            setTwoFactorCode("");
            towFactorValue.current.reset();
            setSubmitData(false);
            // setShowSubmitModal(false);
            setApiWorkMasterToken(false);
          }
        });
    }
  }, [submitData]);
  useEffect(() => {
    if (twoFactorCode.length == 4) {
      handleSubmitOk();
    }
  }, [twoFactorCode]);
  const handleLoginOk = () => {
    if (userKind == "Customer") {
      setApiCustomerToken(true);
      setCustomerLoginBtnClicked(true);
    } else {
      setApiWorkMasterToken(true);
    }
  };
  const handleLoginCancel = () => {
    setShowLoginModal(false);
    setSubmitButton(false);
    setPhoneNumber("");
    authInputes.current.resetFields();
  };
  const showLoginModalF = () => {
    setShowLoginModal(true);
  };
  const handleSubmitOk = () => {
    setSubmitData(true);
    setSubmitButton(false);
  };
  const handleSubmitCancel = () => {
    setSubmitCode(false);
    setSubmitButton(false);
    setShowSubmitModal(false);
    setPhoneNumber("");

    authInputes.current.resetFields();
  };
  const showSubmitModalF = () => {
    setSubmitCode(true);
  };
  const onFinish: CountdownProps["onFinish"] = () => {
    setResendCode(true);
  };
  const resendCodeFunc = () => {
    setApiCustomerToken(true);
    setCustomerLoginBtnClicked(true);
    setResendCode(false);
    setDeadline(Date.now() + 1000 * 60);
  };
  const resendNumberFunc = () => {
    setShowSubmitModal(false);
    setShowLoginModal(true);
    authInputes.current.resetFields();
  };
  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    setWorkMasterPhoneNumber("");
    setPhoneNumber("");
    setUserKind(value);
  };
  const getCode = (code: any) => {
    if (code.length == 4) {
      setActiveAuthButton(true);
    }
    setCode(code);
  };

  const optionsWithDisabled = [
    { label: "مشتری", value: "Customer" },
    { label: "استاد کار", value: "WorkMaster" },
  ];
  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showLoginModalF}
          handleOk={handleLoginOk}
          okText="ارسال"
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleLoginCancel}
          isModalOpen={showLoginModal}
          width={700}
          maskClosable={true}
        >
          <div className="l-radio">
            {redirectTo == "sendReq" ? (
              <p className="mb-3">برای ارسال درخواست ابتدا وارد شوید</p>
            ) : (
              <Radio.Group
                options={optionsWithDisabled}
                onChange={onChange4}
                value={userKind}
                optionType="button"
                buttonStyle="solid"
              />
            )}

            {userKind === "Customer" ? (
              <Form form={form} name="customer_login" ref={authInputes}>
                <Form.Item
                  name="c_number"
                  rules={[
                    {
                      required: true,
                      message: "شماره تماس مشتری",
                    },
                  ]}
                >
                  <CostomInput
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="number"
                    placeholder="شماره تماس مشتری"
                    onChange={(e: any) => {
                      setPhoneNumber(e.target.value);
                    }}
                    style={{ direction: "ltr" }}
                  />
                </Form.Item>
              </Form>
            ) : (
              <Form form={wmForm} name="wm_login" ref={authInputes}>
                <Form.Item
                  name="w_number"
                  rules={[
                    {
                      required: true,
                      message: "شماره تماس استاد کار",
                    },
                  ]}
                >
                  <CostomInput
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="number"
                    className="mb-3"
                    placeholder="شماره تماس استاد کار"
                    onChange={(e: any) => {
                      setWorkMasterPhoneNumber(e.target.value);
                    }}
                    style={{ direction: "ltr" }}
                  />
                  {/* <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="number"
                    placeholder="کد ملی استاد کار"
                    onChange={(e: any) => {
                      setNationalCode(e.target.value);
                    }}
                  /> */}
                </Form.Item>
              </Form>
            )}
          </div>
        </ModalComponent>
      </>
    );
  };
  const SubmitModal = () => {
    return (
      <ModalComponent
        showModal={showSubmitModalF}
        handleOk={handleSubmitOk}
        okText="ارسال"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        handleCancel={handleSubmitCancel}
        isModalOpen={showSubmitModal}
        width={700}
        maskClosable={false}
      >
        <div className="l-radio">
          <h3 className="text-[22px] text-center mb-4">
            کد ۴ رقمی ارسال شده را وارد کنید
          </h3>
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "کد ارسالی" }]}
            >
              {/* <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="number"
                placeholder="کد ۴ رقمی ارسال شده را وارد کنید"
                onChange={(e: any) => {
                  getCode(e.target.value);
                }}
                style={{ direction: "ltr" }}
                
              /> */}
              <div className="w-full h-full flex flex-col gap-6">
                <div dir="ltr" className="flex gap-4">
                  <form
                    ref={towFactorValue}
                    className="form_auth flex items-center justify-center w-full gap-2"
                  >
                    <input
                      autoFocus
                      onInput={(event: any) => {
                        onInputChange(event.target);
                        setTwoFactorCode(event.target.value);
                      }}
                      // onPaste={handlePaste(this)}
                      type="text"
                      className="w-[30px] h-12 text-center two-factor"
                    />
                    <input
                      onInput={(event: any) => {
                        onInputChange(event.target);
                        setTwoFactorCode(twoFactorCode + event.target.value);
                      }}
                      type="text"
                      className="w-[30px] h-12 text-center two-factor"
                    />
                    <input
                      onInput={(event: any) => {
                        onInputChange(event.target);
                        setTwoFactorCode(twoFactorCode + event.target.value);
                      }}
                      type="text"
                      className="w-[30px] h-12 text-center two-factor"
                    />
                    <input
                      onInput={(event: any) => {
                        onInputChange(event.target);
                        setTwoFactorCode(twoFactorCode + event.target.value);
                      }}
                      type="text"
                      className="w-[30px] h-12 text-center two-factor"
                    />
                  </form>
                </div>
                {/* <button
                  id="submit-button"
                  className="border px-3 py-1 border-black"
                >
                  submit
                </button> */}
                <span className="text-[18px] text-center text-[0033ee]">
                  {showErrorLog.length ? showErrorLog : ""}
                </span>
              </div>
            </Form.Item>
          </Form>
          <div className="text-center">
            <p
              className="text-[17px] mb-3 text-center text-blue-500 font-bold cursor-pointer"
              onClick={() => resendNumberFunc()}
            >
              تغییر شماره
            </p>
            {!resendCode ? (
              <p className="text-[17px] text-center flex items-center  justify-center gap-2">
                {" "}
                <span className="">
                  <Countdown
                    format="mm:ss"
                    value={deadline}
                    onFinish={onFinish}
                  />
                </span>{" "}
                تا ارسال کد جدید
              </p>
            ) : (
              <p
                className="text-[17px] text-center text-blue-500 font-bold cursor-pointer"
                onClick={() => resendCodeFunc()}
              >
                {" "}
                ارسال مجدد کد تایید
              </p>
            )}
          </div>
        </div>
      </ModalComponent>
    );
  };
  return (
    <>
      {ModalLogin()}
      {SubmitModal()}
    </>
  );
};

export default Auth;

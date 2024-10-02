"use client";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../global-components/modal/modal";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  daysRemaining,
  moreDaysHour,
  nextWeek,
  roundMinutes,
} from "../../../../utils/functions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import moment from "jalali-moment";
import { Button } from "antd";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Navigation } from "swiper/modules";
const Datepicker = ({
  showPickerModal,
  setShowPickerModal,
  setServiceDate,
  serviceDate,
  setServiceTime,
  serviceTime,
}: any) => {
  const [weekDates, setWeekDates] = useState<any[]>([]);
  const [houres, setHoures] = useState<any[]>([]);
  const [hasDate, setHasDate] = useState(false);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  // const [showTimerStep, setShowTimerStep] = useState(false);
  const router = useRouter();
  const date = moment().locale("fa").format("YYYY/MM/DD");
  useEffect(() => {
    if (showPickerModal) {
      setWeekDates(nextWeek());
      setServiceDate(date);
      setHoures(daysRemaining());
    }
  }, [showPickerModal]);
  useEffect(() => {}, [hasDate]);

  const handlPickerOk = () => {};
  const handlPickerOkF = () => {
    toast.success("درخواست شما با موفقیت ثبت شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setShowPickerModal(false);
    router.push("/customer");
  };
  const handlePickerCancel = () => {
    setShowPickerModal(false);
  };
  const showPickerModalF = () => {
    setShowPickerModal(true);
  };
  function setDateFunction(item: any) {
    setServiceTime({});
    if (item.day == date) {
      setHoures(daysRemaining());
    } else {
      setHoures(moreDaysHour());
    }

    setServiceDate(item.day);
  }
  function setTimeFunction(item: any) {
    setServiceTime(item);
  }

  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showPickerModalF}
          handleOk={handlPickerOk}
          okText="انتخاب تاریخ"
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handlePickerCancel}
          isModalOpen={showPickerModal}
          maskClosable={false}
          width={700}
        >
          {!hasDate && (
            <>
              <h3 className="text-[22px] mb-3">
                لطفا تاریخ سرویس را انتخاب کنید
              </h3>
              <div className="relative flex px-3">
                <Swiper
                  dir="rtl"
                  slidesPerView={6}
                  spaceBetween={0}
                  breakpoints={{
                    320: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  className="mySwiper"
                >
                  {weekDates.map((item, index) => {
                    return (
                      <div key={index}>
                        <SwiperSlide>
                          <div
                            className="flex text-center flex-col items-center justify-center p-0"
                            style={
                              serviceDate == item.day
                                ? {
                                    borderBottom: "3px solid #f29f05",
                                    color: "#f29f05",
                                  }
                                : {}
                            }
                            onClick={() => {
                              setDateFunction(item);
                            }}
                          >
                            {item.dayTitle}
                            <br />
                            {digitsEnToFa(item.day)}
                          </div>
                        </SwiperSlide>
                      </div>
                    );
                  })}
                </Swiper>
                <img
                  ref={navigationPrevRef}
                  className="w-[24px] absolute top-[5px] right-[-10px] z-10 cursor-pointer"
                  alt="previous"
                  src="/assets/img/right-arrow.png"
                />
                <img
                  ref={navigationNextRef}
                  className="w-[24px] absolute top-[5px] left-[-10px] z-10 cursor-pointer"
                  alt="next"
                  src="/assets/img/left-arrow.png"
                />
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap my-3">
                {houres.map((item, index) => {
                  return (
                    <div key={index}>
                      <div
                        className="flex w-[150px] items-center justify-center p-3 rounded-lg cursor-pointer"
                        style={
                          serviceTime.from == item.from
                            ? {
                                border: "3px solid #f29f05",
                                backgroundColor: "#f29f05",
                                color: "#fff",
                                fontWeight: 900,
                              }
                            : { border: "3px solid #eeeeee", color: "#999" }
                        }
                        onClick={() => {
                          setTimeFunction(item);
                        }}
                      >
                        {item.from} الی {item.to}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                disabled={Object.keys(serviceTime).length > 0 ? false : true}
                type="primary"
                onClick={() => handlPickerOkF()}
              >
                انتخاب تاریخ
              </Button>
            </>
          )}
        </ModalComponent>
      </>
    );
  };
  return <>{ModalLogin()}</>;
};

export default Datepicker;

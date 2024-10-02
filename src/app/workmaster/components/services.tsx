"use client";
import ModalComponent from "@/app/global-components/modal/modal";
import RateComponent from "@/app/global-components/rate";
import { Button, Input, InputNumber, Table } from "antd";
import React from "react";

const ExpertServices = ({
  showServiceModal,
  showRate,
  showFactor,
  isPaid,
  tabItem,
  handleServiceOk,
  handleServiceCancel,
  isServiceModalOpen,
  item,
  costWage,
  setCostWage,
  finalCostWage,
  setFinalCostWage,
  showCalButton,
  costEquipment,
  setCostEquipment,
  wmCostWage,
  numberWithCommas,
  serviceId,
  getFactor,
  finalCostEquipment,
  setFinalCostEquipment,
  getResCustomer,
  columns2,
  setRate,
  rate,
  setOpinion,
  sendRateToWM,
  setClickedPay,
}: any) => {
  const { TextArea } = Input;
  return (
    <ModalComponent
      showModal={showServiceModal}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={
        !showRate && showFactor && isPaid
          ? { style: { display: "block" } }
          : !showRate && showFactor && !isPaid
          ? { disabled: true }
          : tabItem == 1
          ? { style: { display: "block" } }
          : { style: { display: "none" } }
      }
      handleOk={() => handleServiceOk(item)}
      okText={tabItem == 3 ? "اتمام کار" : "ارسال"}
      handleCancel={handleServiceCancel}
      isModalOpen={isServiceModalOpen}
      width={1000}
      maskClosable={true}
    >
      {!showRate && (
        <>
          <div dir="rtl">
            {item.typeStatusExpertId == 1 && (
              <>
                <div className="flex gap-2 justify-center flex-col">
                  <p>حدود قیمت دستمزد (تومان)</p>
                  <InputNumber
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    status="warning"
                    size="large"
                    placeholder="حدود قیمت دستمزد (تومان)"
                    formatter={(value: any) =>
                      ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={(e) => {
                      setCostWage(e?.toString());
                    }}
                    style={{ width: "100%" }}
                    value={costWage}
                  />
                </div>
                 
                <div className="flex gap-2 justify-center flex-col">
                  <p>حدود قیمت تجهیزات (تومان)</p>
                  <InputNumber
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    status="warning"
                    size="large"
                    placeholder="حدود قیمت تجهیزات (تومان)"
                    formatter={(value: any) =>
                      ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={(e) => {
                      setCostEquipment(e?.toString());
                    }}
                    style={{ width: "100%" }}
                    value={costEquipment}
                    className="shabnam"
                  />
                </div>
                <br />
                <br />
              </>
            )}
            {item.typeStatusExpertId == 3 && showCalButton && (
              <>
                <div className="flex flex-col gap-1 justify-center">
                  <label>قیمت قطعی دستمزد (تومان)</label>
                  <div className="flex justify-center gap-2">
                    <InputNumber
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      status="warning"
                      size="large"
                      placeholder="قیمت قطعی دستمزد (تومان)"
                      variant="filled"
                      formatter={(value: any) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={(e) => {
                        setFinalCostWage(e?.toString());
                      }}
                      style={{ width: "100%" }}
                      value={finalCostWage}
                    />
                    <p>تومان</p>
                  </div>
                </div>
                 
                <div className="flex flex-col gap-1 justify-center">
                  <label>قیمت قطعی تجهیزات (تومان)</label>
                  <div className="flex justify-center gap-2">
                    <InputNumber
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      status="warning"
                      size="large"
                      placeholder="قیمت قطعی تجهیزات (تومان)"
                      variant="filled"
                      formatter={(value: any) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={(e) => {
                        setFinalCostEquipment(e?.toString());
                      }}
                      value={finalCostEquipment}
                      style={{ width: "100%" }}
                    />
                    <p>تومان</p>
                  </div>
                </div>
                <br />
                <br />
                <Button
                  type="primary"
                  onClick={() => getFactor(item)}
                  disabled={showCalButton ? false : true}
                >
                  محاسبه دستمزد
                </Button>
              </>
            )}
          </div>

          {showFactor &&
            Object.keys(wmCostWage).length > 0 &&
            item.typeStatusExpertId == 3 && (
              <>
                <div className="flex items-center justify-between p-3">
                  <h3 className="text-[22px] m-0">
                    فاکتور رسمی سرویس شماره {serviceId}
                  </h3>
                  <img
                    src="/assets/img/logo.jpg"
                    alt=""
                    className="w-20 h-20"
                  />
                </div>
                <div className="">
                  <div className="mx-auto rounded-lg overflow-hidden">
                    <div className="md:flex">
                      <div className="w-full p-3 ">
                        <div className="rounded-lg border-3 bg-[#f3f3f3] border-dashed border-2 border-[#dcdcdc]">
                          <div className="p-3">
                            <h5 className="text-[#3aa408]">
                              سهم شما از این سرویس :
                            </h5>
                            <div className="flex flex-row items-center gap-2">
                              {" "}
                              <span className="text-[#3aa408] text-3xl font-bold">
                                {numberWithCommas(
                                  Number(wmCostWage.profitCost)
                                )}{" "}
                              </span>{" "}
                              <span className="mt-2 text-black-200 font-bold">
                                تومان
                              </span>{" "}
                            </div>
                          </div>
                          <div className="flex w-full mt-3 mb-3">
                            {" "}
                            <span className="border border-dashed w-full border-white"></span>{" "}
                          </div>
                          <div className="p-3 space-y-5">
                            <div className="flex flex-col">
                              {" "}
                              <span className="text-[#e29306]">
                                پرداختی به پرشین استار:
                              </span>{" "}
                              <span className="text-[#e29306] text-lg font-bold">
                                {numberWithCommas(Number(wmCostWage.shareCost))}{" "}
                                تومان
                              </span>{" "}
                            </div>
                          </div>
                          <div className="flex w-full mt-3 mb-3">
                            {" "}
                            <span className="border border-dashed w-full border-white"></span>{" "}
                          </div>
                          <div className="p-3 flex flex-col space-y-5 justify-center items-center">
                            {isPaid ? (
                              <div className="flex flex-col justify-center">
                                <h5 className="text-[#3aa408]">
                                  مبلغ{" "}
                                  {numberWithCommas(
                                    Number(wmCostWage.shareCost)
                                  )}{" "}
                                  تومان به پرشین استار پرداخت شد
                                </h5>{" "}
                              </div>
                            ) : (
                              <div className="flex flex-col">
                                <h5 className="text-[#ed4c4c]">
                                  هنوز هیچ مبلغی به پرشین استار پرداخت نشده!
                                </h5>{" "}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={() => setClickedPay(true)}
                  className="ml-2"
                >
                  پرداخت از طریق درگاه
                </Button>
                <Button
                  type="primary"
                  onClick={() => getFactor(item)}
                  disabled={true}
                >
                  پرداخت از طریق کیف پول
                </Button>
              </>
            )}
        </>
      )}
      {!showRate && tabItem == 1 && (
        <div dir="rtl">
          <Table columns={columns2} dataSource={getResCustomer} />
        </div>
      )}
      {showRate && tabItem == 3 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-[20px]">امتیاز شما به مشتری</h3>
          <RateComponent rate={rate} setRate={setRate} />
          <TextArea
            onChange={(e) => setOpinion(e.target.value)}
            placeholder="ثبت نظر برای کارشناس"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <Button
            type="primary"
            className="w-40"
            onClick={() => sendRateToWM()}
          >
            ثبت امتیاز
          </Button>
        </div>
      )}
    </ModalComponent>
  );
};

export default ExpertServices;

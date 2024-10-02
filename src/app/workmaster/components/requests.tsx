"use client";
import { Badge, Button, Layout, Space } from "antd";
import React from "react";

const ExpertRequests = ({
  serviceTab,
  tabItem,
  setTabItem,
  getReqCustomer,
  setOptionItem,
  setServiceList,
  setIsServiceModalOpen,
}: any) => {
  ``;
  const { Content } = Layout;
  return (
    <Content
      style={{ padding: "0 24px", minHeight: 280 }}
      className="xs:mb-[100px]"
    >
      <div className="tabs-img-back" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-lg-12">
            <div
              className="Provides"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="300"
            >
              <div
                className="nav nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {serviceTab.map((item: any, index: number) => {
                  return (
                    <button
                      key={index}
                      className={
                        item.typeStatusExpertId === tabItem
                          ? "nav-link active"
                          : "nav-link"
                      }
                      id={`v-pills-${index}-tab`}
                      data-bs-toggle={`pill${index}`}
                      data-bs-target={`#v-pills-${index}`}
                      type="button"
                      role="tab"
                      aria-controls={`v-pills-${index}`}
                      aria-selected={
                        item.typeStatusExpertId === tabItem ? "true" : "false"
                      }
                      onClick={() => {
                        setTabItem(item.typeStatusExpertId);
                      }}
                    >
                      {item.typeStatusName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex bg-[#d1d5db] w-full justify-center">
            <div className="bg-gray-300 overflow-auto flex justify-center h-auto gap-3 flex-wrap p-0">
              {getReqCustomer.map((item: any, index: number) => {
                return (
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "290px" }}
                    className="bg-gray-300 p-[7px] inline-table overflow-auto justify-center h-auto gap-3 flex-wrap py-3"
                  >
                    {tabItem == 1 ? (
                      <Badge.Ribbon
                        text={
                          item.DisableRequest ? "ضرفیت تکمیل" : "ضرفیت آزاد"
                        }
                        className="test"
                        color={item.DisableRequest ? "red" : "green"}
                      >
                        <div
                          className="tab-content w-[290px] h-[300px]"
                          id="v-pills-tabContent"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                          >
                            <div className="bg-white p-10 rounded-lg shadow-md h-[300px]">
                              <h1 className="text-[15px] leading-[28px] overflow-auto font-bold h-14 w-[200px] max-h-14 mb-4">
                                نوع درخواست :{item.serviceName}
                              </h1>

                              <h3 className="text-xs uppercase ">
                                شهر درخواست :{" "}
                                <span className="w-[fit-content] bg-[#eee] p-2 rounded-lg">
                                  {item.cityName}
                                </span>
                              </h3>
                              <h2 className="tracking-wide">
                                شماره درخواست :{item.requestNumber}
                              </h2>

                              <Button
                                className={
                                  "bg-[#f29f05] h-14 w-full text-white py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75"
                                }
                                type="primary"
                                onClick={() => {
                                  setIsServiceModalOpen(true);
                                  setServiceList(item);
                                  setOptionItem(item.requestNumber);
                                }}
                              >
                                ارسال قیمت پیشنهادی
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Badge.Ribbon>
                    ) : (
                      <div
                        className="tab-content w-[290px] h-[300px]"
                        id="v-pills-tabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="v-pills-home"
                          role="tabpanel"
                          aria-labelledby="v-pills-home-tab"
                        >
                          <div className="bg-white p-10 rounded-lg shadow-md h-[300px]">
                            <h1 className="text-[15px] leading-[28px] overflow-auto font-bold h-14 w-[200px] max-h-14 mb-4">
                              نوع درخواست :{item.serviceName}
                            </h1>

                            <h3 className="text-xs uppercase ">
                              شهر درخواست :{" "}
                              <span className="w-[fit-content] bg-[#eee] p-2 rounded-lg">
                                {item.cityName}
                              </span>
                            </h3>
                            <h2 className="tracking-wide">
                              شماره درخواست :{item.requestNumber}
                            </h2>

                            <Button
                              className={
                                "bg-[#f29f05] h-14 w-full text-white py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75"
                              }
                              type="primary"
                              onClick={() => {
                                setIsServiceModalOpen(true);
                                setServiceList(item);
                                setOptionItem(item.requestNumber);
                              }}
                              disabled={
                                tabItem == 2 ||
                                tabItem == 4 ||
                                item.DisableRequest
                                  ? true
                                  : false
                              }
                            >
                              {tabItem == 2
                                ? "در حال برسی مشتری"
                                : tabItem == 3
                                ? "درخواست اتمام کار"
                                : tabItem == 4
                                ? "تاریخچه سرویس"
                                : "ارسال قیمت پیشنهادی"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Space>
                );
              })}
            </div>
          </div>
          {/* <Table
                      columns={columns}
                      dataSource={getReqCustomer}
                      onChange={onChange}
                    /> */}
        </div>
      </div>
    </Content>
  );
};

export default ExpertRequests;

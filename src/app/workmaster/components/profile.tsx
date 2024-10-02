"use client";
import { Button, Layout, Progress } from "antd";
import React from "react";
import { BASE_IMAGE_URL } from "../../../../globals";

const ExpertProfile = ({
  wmInfo,
  experts,
  setShowWmEditModal,
  setShowExpertModal,
  setShowCertificateModal,
}: any) => {
  const { Content } = Layout;
  return (
    <Content
      style={{ padding: "0 24px", minHeight: 280 }}
      className="xs:mb-[100px]"
    >
      <div className="tabs-img-back">
        <div className="container">
          <div className="home">
            <div className="home-ctn ctn">
              <div className="">
                <div className="flex sm:items-start sm:flex-row justify-start gap-10 xs:flex-col xs:items-start">
                  <img
                    src={BASE_IMAGE_URL + wmInfo?.imagePath}
                    alt=""
                    className="box-one-img mb-3"
                  />
                  {/* <div>
                    <Progress
                      strokeColor="#f29f05"
                      type="circle"
                      percent={20}
                      format={(percent) => `٪${percent} تکمیل شده`}
                    />
                    <p>وضعیت پروفایل شما</p>
                  </div> */}
                </div>
                <p>{wmInfo?.expertName}</p>
                <h3>تاریخ تولد : {wmInfo?.birthDate}</h3>
                <h5>شماره تماس : {wmInfo?.mobile}</h5>
                <p>مهارت ها: </p>
                <ul className="flex flex-wrap gap-3 mb-3">
                  {experts.map((item: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className="w-[fit-content] bg-[#eee] p-2 rounded-lg"
                      >
                        {item.serviceName}
                      </li>
                    );
                  })}
                </ul>
                <Button
                  type="primary"
                  className="ml-[10px] mb-3"
                  onClick={() => {
                    setShowWmEditModal(true);
                  }}
                >
                  ویرایش پروفایل
                </Button>
                <Button
                  type="primary"
                  className="ml-[10px] mb-3"
                  onClick={() => {
                    setShowExpertModal(true);
                  }}
                >
                  ویرایش مهارت ها
                </Button>
                <Button
                  type="primary"
                  className="mb-3"
                  onClick={() => {
                    setShowCertificateModal(true);
                  }}
                >
                  گواهی های شما
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default ExpertProfile;

"use client";
import { Button } from "antd";
import React from "react";

const ExpertAddress = ({ addressForExpert, setShowAddWmAddressModal }: any) => {
  return (
    <div className="row xs:mb-[50px] p-">
      <div className="col-lg-12 p-5">
        <div className="">
          <h3>شهر محل سکونت: </h3>
          <p>{addressForExpert[0]?.address}</p>
        </div>
        <div className="">
          <h3>موفقیت جغرافیایی از روی نقشه:</h3>
          <p>به زودی...</p>
        </div>
        <Button
          className="mt-3"
          type="primary"
          onClick={() => {
            setShowAddWmAddressModal(true);
          }}
        >
          تغییر آدرس
        </Button>
      </div>
    </div>
  );
};

export default ExpertAddress;

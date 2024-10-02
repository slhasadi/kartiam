"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
import { EditProfileCustomer } from "../../../../network/customer";
import {
  GetAddressExpert,
  RegisterAddressExpert,
} from "../../../../network/work-master";
import ModalComponent from "@/app/global-components/modal/modal";

const AddWmAddress = ({
  showAddWmAddressModal,
  setShowAddWmAddressModal,
  setAddressForExpert,
}: any) => {
  const [sendEdit, setSendEdit] = useState<any>(false);
  const [newAddress, setNewAddress] = useState<any>("");
  const { TextArea } = Input;
  const handlEditOk = () => {
    setSendEdit(true);
  };
  const handleEditCancel = () => {
    setShowAddWmAddressModal(false);
  };
  useEffect(() => {
    if (sendEdit) {
      const data = {
        addressId: 0,
        expertId: 0,
        address: newAddress,
        regionId: 3,
        cityId: 62,
        villageId: 11433,
        latitudeLocation: "",
        longitudeLocation: "",
      };
      RegisterAddressExpert(data).then(() => {
        setShowAddWmAddressModal(false);
        GetAddressExpert().then((res) => {
          setAddressForExpert(res.data);
        });
      });
    }
  }, [sendEdit]);

  const Address = (e: any) => {
    setNewAddress(e);
  };
  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showAddWmAddressModal}
          handleOk={handlEditOk}
          okText="تغییر"
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleEditCancel}
          isModalOpen={showAddWmAddressModal}
          width={700}
          maskClosable={true}
        >
          <h3 className="text-[19px]">افزودن آدرس جدید</h3>
          <TextArea
            onChange={(e) => {
              Address(e.target.value);
            }}
            placeholder="آدرس جدید را وارد کنید"
          />
        </ModalComponent>
      </>
    );
  };
  return <>{ModalLogin()}</>;
};

export default AddWmAddress;

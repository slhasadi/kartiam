"use client";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Input, UploadFile, UploadProps } from "antd";
import { EditProfileCustomer } from "../../../../network/customer";
import { getWorkMasterInfo } from "../../../../redux/slices/workMasterSlice";
import { EditProfileExpert } from "../../../../network/work-master";
import UploadFiles from "@/app/global-components/upload-single-file";
import ModalComponent from "@/app/global-components/modal/modal";
import CostomInput from "@/app/global-components/costom-input";
const { TextArea } = Input;
const EditWmProfile = ({
  showWmEditModal,
  setShowWmEditModal,
  workMaster,
  setUpdateWmInfo,
}: any) => {
  const [sendEdit, setSendEdit] = useState<any>(false);
  const [birthDay, setBirthDay] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [photo, setPhoto] = useState<any>();
  const [fileList, setFileList] = useState<any[]>([]);
  let formData: any = new FormData();
  const handlEditOk = () => {
    setSendEdit(true);
  };
  const handleEditCancel = () => {
    setShowWmEditModal(false);
  };
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {
    if (sendEdit) {
      if (fileList.length) {
        formData.append("_photo", fileList[0].originFileObj);
      } else {
        formData.append("_photo", workMaster.imageName);
      }
      if (birthDay.length) {
        formData.append("birthDate", birthDay);
      } else {
        formData.append("birthDate", workMaster?.birthDate);
      }
      if (email.length) {
        formData.append("email", email);
      } else {
        formData.append("email", workMaster?.email);
      }
      if (name.length) {
        formData.append("expertName", name);
      } else {
        formData.append("expertName", workMaster?.expertName);
      }
      formData.append("nationalCode", workMaster.nationalCode);
      EditProfileExpert(formData).then(() => {
        setUpdateWmInfo(true);
        setShowWmEditModal(false);
        setSendEdit(false);
        setBirthDay("");
        setName("");
        setEmail("");
      });
    }
  }, [sendEdit]);
  const birthDate = (e: any) => {
    setBirthDay(e);
  };
  const emailAddress = (e: any) => {
    setEmail(e);
  };
  const customerName = (e: any) => {
    setName(e);
  };
  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showWmEditModal}
          handleOk={handlEditOk}
          okText="تغییر"
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleEditCancel}
          isModalOpen={showWmEditModal}
          width={700}
          maskClosable={true}
        >
          <h3 className="text-[19px]">ویرایش پروفایل استادکار</h3>
          <CostomInput
            onChange={(e: any) => {
              customerName(e.target.value);
            }}
            placeholder={workMaster?.expertName}
            className="mb-3"
            // value={workMaster.expertName}
          />
          <CostomInput
            onChange={(e: any) => {
              emailAddress(e.target.value);
            }}
            placeholder={workMaster?.email}
            type="email"
            className="mb-3"
            // value={workMaster.email}
          />
          <CostomInput
            onChange={(e: any) => {
              birthDate(e.target.value);
            }}
            className="mb-3"
            placeholder={workMaster?.birthDate}
            // value={workMaster.birthDate}
          />
          <TextArea
            rows={4}
            status="warning"
            className="mb-3"
            placeholder="درباره من"
            maxLength={120}
          />
          <UploadFiles onChangeItem={onChange} fileList={fileList} />
        </ModalComponent>
      </>
    );
  };
  return <>{ModalLogin()}</>;
};

export default EditWmProfile;

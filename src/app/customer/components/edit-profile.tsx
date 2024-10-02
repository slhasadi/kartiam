"use client";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../global-components/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { Input, UploadProps } from "antd";
import UploadFiles from "@/app/global-components/upload-single-file";
import {
  EditProfileCustomer,
  getInfoCustomer,
} from "../../../../network/customer";
import CostomInput from "@/app/global-components/costom-input";
import { BASE_IMAGE_URL } from "../../../../globals";
import { setUserInfo } from "../../../../redux/slices/userSlices";

const EditProfile = ({
  showEditModal,
  customerInfo,
  setShowEditModal,
  setUpdateCustomerInfo,
}: any) => {
  // const user = useSelector((state: any) => state.user?.user);

  const [disabledButton] = useState<any>(true);
  const [sendEdit, setSendEdit] = useState<any>(false);
  const [birthDay, setBirthDay] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>();
  const dispatch = useDispatch();
  let formData = new FormData();
  const handlEditOk = () => {
    setSendEdit(true);
  };
  const handleEditCancel = () => {
    setShowEditModal(false);
  };
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {
    if (showEditModal && customerInfo.imageName) {
      console.log("has image");

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: BASE_IMAGE_URL + customerInfo.imagePath,
        },
      ]);
    }
  }, [showEditModal]);
  useEffect(() => {
    if (sendEdit) {
      if (fileList.length) {
        formData.append("_photo", fileList[0].originFileObj);
      } else {
        formData.append("_photo", customerInfo.imageName);
      }
      // if (photo) {
      //   formData.append("photo", photo);
      // } else {
      //   formData.append("photo", user.imageName);
      // }
      if (birthDay.length) {
        formData.append("birthDate", birthDay);
      } else {
        formData.append("birthDate", customerInfo?.birthDate);
      }
      if (name.length) {
        formData.append("customerName", name);
      } else {
        formData.append("customerName", customerInfo?.customerName);
      }
      formData.append("nationalCode", customerInfo.nationalCode);

      EditProfileCustomer(formData).then(() => {
        setSendEdit(false);
        setUpdateCustomerInfo(true);
        setBirthDay("");
        setName("");
        setShowEditModal(false);
      });
    }
  }, [sendEdit, name, birthDay]);
  const birthDate = (e: any) => {
    setBirthDay(e);
  };
  const customerName = (e: any) => {
    setName(e);
  };
  const onFileChange = (e: any) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showEditModal}
          handleOk={handlEditOk}
          okText="تغییر"
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleEditCancel}
          isModalOpen={showEditModal}
          width={700}
          maskClosable={true}
        >
          <h3 className="text-[19px]">ویرایش پروفایل</h3>
          <CostomInput
            className="mb-3"
            onChange={(e: any) => {
              customerName(e.target.value);
            }}
            placeholder={customerInfo?.customerName}
          />
          <CostomInput
            className="mb-3"
            onChange={(e: any) => {
              birthDate(e.target.value);
            }}
            placeholder={customerInfo?.birthDate}
          />
          {/* <CostomInput type="file" name="file_upload" onChange={onFileChange} /> */}
          <UploadFiles onChangeItem={onChange} fileList={fileList} />
        </ModalComponent>
      </>
    );
  };
  return <>{ModalLogin()}</>;
};

export default EditProfile;

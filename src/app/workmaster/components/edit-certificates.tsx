"use client";
import React, { useEffect, useState } from "react";
import { GetProp, UploadFile, UploadProps } from "antd";
import { Image, Upload } from "antd";

import {
  AddExpertLicense,
  GetExpertLicense,
  GetTypeLicense,
} from "../../../../network/work-master";
import UploadFiles from "@/app/global-components/upload-single-file";
import ModalComponent from "@/app/global-components/modal/modal";

import ImgCrop from "antd-img-crop";
import UploadMultiFile from "@/app/global-components/upload-multi-file";
import CertOne from "./certificates/cert-one";
import CertTwo from "./certificates/cert-two";
import CertThree from "./certificates/cert-three";

const EditCertificates = ({
  showCertificateModal,
  setShowCertificateModal,
  workMaster,
  setUpdateWmInfo,
}: any) => {
  const [sendEdit, setSendEdit] = useState<any>(false);

  const [fileListOne, setFileListOne] = useState<any[]>([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);
  const [fileListTwo, setFileListTwo] = useState<any[]>([]);
  const [fileListThree, setFileListThree] = useState<any[]>([]);
  const [typeLicense, setTypeLicense] = useState<any[]>([]);
  let formData: any = new FormData();
  const handlEditOk = () => {
    // setSendEdit(true);
    setShowCertificateModal(false);
  };
  const handleEditCancel = () => {
    setShowCertificateModal(false);
  };

  useEffect(() => {
    if (showCertificateModal) {
      GetTypeLicense().then((response) => {
        setTypeLicense(response.data);
      });
      GetExpertLicense().then((response) => {
        // setFileList(response.data);
      });
    }
  }, [showCertificateModal]);

  const UploadFiles = () => {
    return (
      <>
        <ModalComponent
          showModal={showCertificateModal}
          handleOk={handlEditOk}
          okText="تمام"
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleEditCancel}
          isModalOpen={showCertificateModal}
          width={700}
          maskClosable={true}
        >
          <div className="flex gap-3 flex-col items-start">
            {typeLicense.map((item, index) => {
              return (
                <CertOne
                  fileList={fileListOne}
                  types={item}
                  key={index}
                  setFileList={setFileListOne}
                />
              );
            })}
            {/* <CertTwo fileList={fileListTwo} setFileList={setFileListTwo} />
            <CertThree
              fileList={fileListThree}
              setFileList={setFileListThree}
            /> */}
            {/* <CertFour fileList={fileListFour} setFileList={setFileListFour} />
            <CertFive fileList={fileListFive} setFileList={setFileListFive} /> */}
          </div>
        </ModalComponent>
      </>
    );
  };
  return <>{UploadFiles()}</>;
};

export default EditCertificates;

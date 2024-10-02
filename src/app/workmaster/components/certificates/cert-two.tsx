import React, { useState } from "react";
import UploadFiles from "@/app/global-components/upload-single-file";

import ImgCrop from "antd-img-crop";
import UploadMultiFile from "@/app/global-components/upload-multi-file";
import { GetProp, Image, Upload, UploadFile, UploadProps } from "antd";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CertTwo = ({ setFileList, fileList }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const onRemoveItem = (item: any) => {};
  return (
    <div className="text-center">
      <p className="text-[14px]">کارت سلامت</p>
      <ImgCrop
        rotationSlider
        modalTitle="ویرایش تصویر"
        modalOk="ثبت"
        modalCancel="انصراف"
      >
        <Upload
          name="test"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
          onRemove={(e: any) => onRemoveItem(e)}
          maxCount={1}
        >
          {fileList.length < 1 && "بارگذاری..."}
        </Upload>
      </ImgCrop>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default CertTwo;

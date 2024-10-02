"use client";
import React, { useState } from "react";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const UploadMultiFile = ({ onChangeItem, fileList }: any) => {
  //   const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const onRemoveItem = (item: any) => {};
  return (
    <>
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
          onChange={onChangeItem}
          onPreview={handlePreview}
          onRemove={(e: any) => onRemoveItem(e)}
          maxCount={10}
        >
          {fileList.length < 10 && "بارگذاری..."}
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
    </>
  );
};

export default UploadMultiFile;

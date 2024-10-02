"use client";
import React, { FC, HTMLProps, useState } from "react";
import { Button, Modal, message, Steps, theme } from "antd";

interface Props extends HTMLProps<HTMLButtonElement> {
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  okButtonProps: any;
  cancelButtonProps: any;
  okText: string;
  maskClosable: boolean;
}

const ModalComponent: FC<Props> = ({
  children,
  showModal,
  handleOk,
  handleCancel,
  isModalOpen,
  width,
  cancelButtonProps,
  okButtonProps,
  okText,
  maskClosable,
}: Props) => {
  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        cancelButtonProps={cancelButtonProps}
        okButtonProps={okButtonProps}
        okText={okText}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
        maskClosable={maskClosable}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;

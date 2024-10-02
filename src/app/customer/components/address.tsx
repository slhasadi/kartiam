"use client";
import React, { useEffect, useState } from "react";
import ModalComponent from "../../global-components/modal/modal";
import { Radio } from "antd";
import { Input, RadioChangeEvent } from "antd";
import {
  AddAddressCustomer,
  GetAddressCustomer,
} from "../../../../network/customer";
import { useSelector } from "react-redux";
const Address = ({
  showAddressModal,
  setShowAddressModal,
  setShowPickerModal,
  setSelectAddress,
  selectAddress,
}: any) => {
  const user = useSelector((state: any) => state.user?.user);
  const [customerAddress, setCustomerAddress] = useState<any>("");
  const [postAddress, setPostAddress] = useState<any>(false);
  const [disabledButton, setDisabledButton] = useState<any>(true);
  const [addresses, setAddresses] = useState<any[]>([] as any);
  const [addressKind, setAddressKind] = useState("PreviusAddress");
  const { TextArea } = Input;
  useEffect(() => {
    if (postAddress && addressKind == "NewAddress") {
      const data = {
        customerId: user.customerId,
        address: customerAddress,
        latitudeLocation: "",
        longitudeLocation: "",
        status: true,
      };
      AddAddressCustomer(data).then((res) => {
        if (res.data) {
          setAddressKind("PreviusAddress");
          setCustomerAddress("");
        }
      });
    }
  }, [postAddress]);
  useEffect(() => {
    if (showAddressModal && addressKind == "PreviusAddress") {
      GetAddressCustomer().then((res) => {
        setAddresses(res.data);
      });
    }
  }, [showAddressModal, addressKind]);

  const handlAddressOk = () => {
    if (addressKind == "NewAddress") {
      setPostAddress(true);
      setDisabledButton(true);
    } else {
      setShowAddressModal(false);
      setShowPickerModal(true);
    }
  };
  const handleAddressCancel = () => {
    setShowAddressModal(false);
  };
  const showAddressModalF = () => {
    setShowAddressModal(true);
  };
  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    setAddressKind(value);
  };
  const setOldAddress = (e: any) => {
    setSelectAddress(e);
  };
  const optionsWithDisabled = [
    { label: "آدرس های قبلی من", value: "PreviusAddress" },
    { label: "آدرس جدید", value: "NewAddress" },
  ];
  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showAddressModalF}
          handleOk={handlAddressOk}
          okText="انتخاب آدرس"
          okButtonProps={
            selectAddress || customerAddress || !disabledButton
              ? { style: { display: "block" }, disabled: false }
              : { style: { display: "block" }, disabled: true }
          }
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleAddressCancel}
          isModalOpen={showAddressModal}
          width={700}
          maskClosable={true}
        >
          <h3>لطفا آدرس مورد نظر خود را انتخاب کنید</h3>
          <Radio.Group
            options={optionsWithDisabled}
            onChange={onChange4}
            value={addressKind}
            optionType="button"
            buttonStyle="solid"
          />
          <br />
          <br />
          {addressKind == "NewAddress" ? (
            <TextArea
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="ثبت آدرس جدید"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          ) : addresses.length == 0 ? (
            <p>هنوز آدرسی ذخیره نکرده اید</p>
          ) : (
            <div className="my-3">
              <Radio.Group name="radiogroup">
                {addresses.map((item: any, index: number) => {
                  return (
                    <Radio
                      key={index}
                      value={item.addressId}
                      onChange={() => {
                        setOldAddress(item.addressId);
                      }}
                    >
                      <p>{item.address}</p>
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          )}
        </ModalComponent>
      </>
    );
  };
  return <>{ModalLogin()}</>;
};

export default Address;

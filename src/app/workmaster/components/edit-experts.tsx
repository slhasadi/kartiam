"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Select, Space } from "antd";
import { EditProfileCustomer } from "../../../../network/customer";
import {
  GetExpertServices,
  GetServiceCategory,
  GetServices,
  RegisterExpertHistory,
} from "../../../../network/work-master";
import ModalComponent from "@/app/global-components/modal/modal";
import CostomInput from "@/app/global-components/costom-input";

const EditExperts = ({
  showExpertModal,
  setShowExpertModal,
  setExperts,
}: any) => {
  const [sendEdit, setSendEdit] = useState<any>(false);
  const [skillScore, setSkillScore] = useState<any>("");
  const [workHistoryMonth, setWorkHistoryMonth] = useState<any>("");
  const [serviceCategoryId, setServiceCategoryId] = useState(1);
  const [serviceInputId, setServiceInputId] = useState(0);
  const [serviceCategoryTitle, setServiceCategoryTitle] = useState<any>("");
  const [serviceInputTitle, setServiceInputTitle] = useState<any>("");
  const [serviceCategory, setServiceCategory] = useState([]);
  const [service, setService] = useState([]);

  const handlEditOk = () => {
    setSendEdit(true);
  };
  const handleEditCancel = () => {
    setShowExpertModal(false);
  };
  useEffect(() => {
    if (sendEdit) {
      const data = {
        categoryServiceId: serviceCategoryId,
        categoryServiceName: serviceCategoryTitle,
        serviceId: serviceInputId,
        serviceName: serviceInputTitle,
        workHistoryMonth: workHistoryMonth,
        skillScore: skillScore,
      };
      RegisterExpertHistory(data).then(() => {
        setShowExpertModal(false);
        GetExpertServices().then((response) => {
          setExperts(response.data);
        });
      });
    }
  }, [sendEdit]);
  useEffect(() => {
    if (showExpertModal) {
      GetServiceCategory().then((res: any) => {
        setServiceCategory(res.data);
      });
    }
  }, [showExpertModal]);
  useEffect(() => {
    if (serviceCategoryId > 0) {
      GetServices(serviceCategoryId).then((res) => {
        setService(res.data);
      });
    }
  }, [serviceCategoryId]);
  const handleChange = (value: string) => {
    setWorkHistoryMonth(value);
  };
  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showExpertModal}
          handleOk={handlEditOk}
          okText="تغییر"
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleEditCancel}
          isModalOpen={showExpertModal}
          width={700}
          maskClosable={true}
        >
          <h3 className="text-[19px]">افزودن مهارت</h3>

          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div className="">
              <div className="nice-select-one">
                <Space direction="vertical" size="middle">
                  <Space.Compact>
                    <Select
                      showSearch
                      style={{
                        width: "100%",
                        height: "55px",
                        borderRadius: "8px",
                        border: "1px solid #faad14",
                      }}
                      placeholder="انتخاب کنید"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      onChange={(value, label: any) => {
                        setServiceCategoryId(value);
                        setServiceCategoryTitle(label.label);
                      }}
                      filterSort={(optionA: any, optionB: any) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={serviceCategory.map((item: any) => ({
                        value: item.serviceCategoryId,
                        label: item.serviceCategoryName,
                      }))}
                    />
                  </Space.Compact>
                </Space>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="v-pills-home2"
            role="tabpanel2"
            aria-labelledby="v-pills-home-tab2"
          >
            <div className="">
              <div className="nice-select-one">
                <Space direction="vertical" size="middle">
                  <Space.Compact>
                    <Select
                      showSearch
                      style={{
                        width: "100%",
                        height: "55px",
                        borderRadius: "8px",
                        border: "1px solid #faad14",
                      }}
                      placeholder="انتخاب کنید"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      onChange={(value, label: any) => {
                        setServiceInputId(value);
                        setServiceInputTitle(label.label);
                      }}
                      filterSort={(optionA: any, optionB: any) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={service.map((item: any) => ({
                        value: item.serviceId,
                        label: item.serviceName,
                      }))}
                    />
                  </Space.Compact>
                </Space>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="v-pills-home2"
            role="tabpanel2"
            aria-labelledby="v-pills-home-tab2"
          >
            <div className="">
              <div className="nice-select-one">
                <Space direction="vertical" size="middle">
                  <Space.Compact>
                    <CostomInput
                      style={{
                        width: "100%",
                        height: "55px",
                      }}
                      onChange={(e: any) => {
                        setSkillScore(e.target.value);
                      }}
                      placeholder="تجربه کاری بر حسب سال"
                      type="number"
                    />
                  </Space.Compact>
                </Space>
              </div>
            </div>
            <div className="">
              <div className="nice-select-one">
                <Space direction="vertical" size="middle">
                  <Space.Compact>
                    <Select
                      style={{
                        width: "100%",
                        height: "55px",
                        borderRadius: "8px",
                        border: "1px solid #faad14",
                      }}
                      onChange={handleChange}
                      options={[
                        { value: "کم", label: "کم" },
                        { value: "متوسط", label: "متوسط" },
                        { value: "زیاد", label: "زیاد" },
                      ]}
                      placeholder="میزان مهارت شما"
                    />
                  </Space.Compact>
                </Space>
              </div>
            </div>
          </div>
        </ModalComponent>
      </>
    );
  };
  return <>{ModalLogin()}</>;
};

export default EditExperts;

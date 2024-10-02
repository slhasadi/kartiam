"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalComponent from "../global-components/modal/modal";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { BASE_API_URL, BASE_IMAGE_URL } from "../../../globals";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./customer.module.css";
import Icon, {
  ProfileOutlined,
  UserOutlined,
  CommentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Layout, Menu, Card } from "antd";
import FooterComponent from "../global-components/layout/footer";
import {
  GetListRequestForExpert,
  RequestExpert,
} from "../../../network/work-master";
import {
  ConfirmRequest,
  GetExpertForDashboard,
  GetRequestCustomerForDashboard,
  GetScoreCustomer,
  GetStatusTypeCustomer,
  RegisterScoreCustomer,
  getInfoCustomer,
} from "../../../network/customer";
import { getUserInfo } from "../../../redux/slices/userSlices";
import { numberWithCommas } from "../../../utils/functions";
import RateComponent from "../global-components/rate";
import EditProfile from "./components/edit-profile";
import CostomInput from "../global-components/costom-input";
import Link from "next/link";

const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
interface DataType {
  key: React.Key;
  row: React.Key;
  reqNumber: string;
  reqKind: string;
  reqDate: string;
}
export default function Customer() {
  const user = useSelector((state: any) => state.user?.user);
  const [questionList, setQuestionList] = useState<any>([]);
  const [getReqCustomer, setReqCustomer] = useState<any>([]);
  const [getResCustomer, setResCustomer] = useState<any>([]);
  const [workMasters, setWorkMasters] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [submitCode, setSubmitCode] = useState(false);
  const [submitData, setSubmitData] = useState(false);
  const [sendResponse, setSendResponse] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [sendRate, setSendRate] = useState(false);
  const [costWage, setCostWage] = useState("");
  const [opinion, setOpinion] = useState("");
  const [costEquipment, setCostEquipment] = useState("");
  const [rate, setRate] = useState(4);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [optionItem, setOptionItem] = useState({} as any);
  const [answersData, setAnswersData] = useState<any[]>([]);
  const [serviceTab, setServiceTab] = useState<any[]>([]);
  const [scoreForCustomer, setScoreForCustomer] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [customerInfo, setCustomerInfo] = useState<any>();
  const [wmId, setWmId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [idParams, setIdParams] = useState(0);
  const [menuItem, setMenuItem] = useState<any>("1");
  const [showNav, setShowNav] = useState(false);
  const [code, setCode] = useState(0);
  const [tabItem, setTabItem] = useState(1);
  const [updateCustomerInfo, setUpdateCustomerInfo] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { TextArea } = Input;

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem("درخواست ها ", "1", <ProfileOutlined />),
    getItem("پروفایل", "2", <UserOutlined />),
    getItem("نظرات", "3", <CommentOutlined />),
    getItem("پشتیبانی", "4", <PhoneOutlined />),
  ];
  const onChange: TableProps<DataType>["onChange"] = () => {};
  const columns: ColumnsType<DataType> = [
    {
      title: "شماره درخواست",
      dataIndex: "requestId",
    },
    {
      title: "نوع درخواست",
      dataIndex: "serviceName",
    },
    {
      title: "شهر",
      dataIndex: "cityName",
    },
    {
      title: "تاریخ  درخواست",
      dataIndex: "dateRequest",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (item) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              setIsServiceModalOpen(true);
              setOptionItem(item);
            }}
          >
            جزئیات
          </Button>
        </div>
      ),
    },
  ];
  const scoreColumns: ColumnsType<DataType> = [
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "dateRegisterComment",
    },
    {
      title: "امتیاز",
      dataIndex: "score",
    },
    {
      title: "نظر",
      dataIndex: "customerOpinion",
    },
  ];
  const columns2: ColumnsType<DataType> = [
    {
      title: "سوالات سرویس مورد نظر",
      dataIndex: "questionText",
    },
    {
      title: "پاسخ های شما",
      dataIndex: "answerText",
    },
  ];

  const onFinish = (values: any) => {};
  useEffect(() => {
    dispatch(getUserInfo("dashboard") as any);
  }, []);
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setHasUser(true);
    } else {
      // signOut();
    }
  }, [user]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && hasUser) {
      // GetListRequestForExpert(tabItem).then((response) => {
      //   setServiceList(response.data);
      // });
      GetStatusTypeCustomer().then((response) => {
        setServiceTab(response.data);
      });
    }
  }, [hasUser]);
  useEffect(() => {
    if (menuItem == "3") {
      GetScoreCustomer().then((res) => {
        setScoreForCustomer(res.data);
      });
    }
  }, [menuItem]);
  useEffect(() => {
    if (sendRate) {
      const data = {
        requestNumber: optionItem?.requestId,
        customerId: optionItem.customerId,
        expertId: workMasters[0].expertId,
        score: rate,
        customerOpinion: opinion,
      };
      RegisterScoreCustomer(data).then((response) => {
        setSendRate(false);
        setShowRate(false);
        setIsServiceModalOpen(false);
        setOpinion("");
        setRate(4);
        toast.success("نظر شما با موفقیت ثبت شد", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    }
  }, [sendRate]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && idParams > 0 && hasUser) {
      axios
        .get(`${BASE_API_URL}GetQuestionServices/${idParams}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setQuestionList(response.data);
        });
    }
  }, [idParams, hasUser]);

  useEffect(() => {
    if (hasUser) {
      GetRequestCustomerForDashboard(tabItem).then((response) => {
        setReqCustomer(response.data);
      });
    }
  }, [tabItem, hasUser]);
  useEffect(() => {
    if (isServiceModalOpen && hasUser) {
      const token = localStorage.getItem("token");
      axios
        .get(
          `${BASE_API_URL}GetAnswerCustomerForDashboard?RequestNumber=${optionItem?.requestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setResCustomer(response.data);
          GetExpertForDashboard(optionItem?.requestId).then((response) => {
            setWorkMasters(response.data.experts);
          });
        });
    }
  }, [isServiceModalOpen, hasUser]);
  useEffect(() => {
    if (sendResponse && hasUser) {
      const data = {
        workMasterId: wmId,
        requestNumber: serviceId,
        temporaryCostWage: costWage,
        temporaryCostEquipment: costEquipment,
      };

      RequestExpert(data).then((response) => {
        setIsServiceModalOpen(false);
        GetListRequestForExpert(tabItem).then((response) => {
          setReqCustomer(response.data);
        });
      });
    }
  }, [sendResponse, hasUser]);
  useEffect(() => {
    if (idParams > 0 && questionList.length === answersData.length) {
      setIsServiceModalOpen(false);
      setTimeout(() => {
        setShowLoginModal(true);
      }, 500);
    }
  }, [answersData, hasUser]);

  useEffect(() => {
    if (code > 0 && submitData && hasUser) {
      const assign = {
        mobile: phoneNumber,
        customerName: name,
        tempRegNumber: code.toString(),
      };
      for (let i = 0; i < answersData.length; i++) {
        Object.assign(answersData[i], assign);
      }
      axios
        .post(`${BASE_API_URL}AnswerCustomer`, answersData)
        .then((response) => {
          setIsServiceModalOpen(false);
          setTimeout(() => {
            setSubmitCode(false);
          }, 500);
        });
    }
  }, [submitData, hasUser]);
  const showServiceModal = () => {
    if (questionList.length > 0) {
      setIsServiceModalOpen(true);
    }
  };
  const handleServiceOk = (item: any) => {
    setWmId(item.CustomerId);
    setServiceId(item.requestNumber);
    setSendResponse(true);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setMenuItem(e.key);
  };
  useEffect(() => {
    if (updateCustomerInfo || menuItem == "2") {
      getInfoCustomer().then((response) => {
        setCustomerInfo(response.data);
        setUpdateCustomerInfo(false);
      });
    }
  }, [updateCustomerInfo, menuItem]);
  const handleServiceCancel = () => {
    setIsServiceModalOpen(false);
  };
  const handleLoginOk = () => {
    setShowLoginModal(false);
    if (phoneNumber.length && name.length) {
      setSubmitCode(true);
    }
  };
  const handleLoginCancel = () => {
    setShowLoginModal(false);
  };
  const showLoginModalF = () => {
    setShowLoginModal(true);
  };
  const handleSubmitOk = () => {
    setSubmitData(true);
    // setSubmitCode(false);
  };
  const handleSubmitCancel = () => {
    setSubmitCode(false);
  };
  const showSubmitModalF = () => {
    setSubmitCode(true);
  };
  const signOut = () => {
    dispatch(getUserInfo("dashboard") as any);
    localStorage.clear();
    router.replace("/");
  };
  const setConfirmRequest = (wId: any) => {
    ConfirmRequest(optionItem?.requestId, wId).then((response) => {
      setIsServiceModalOpen(false);
      GetRequestCustomerForDashboard(tabItem).then((response) => {
        setReqCustomer(response.data);
      });
    });
  };
  const requestIsDone = () => {
    setShowRate(true);
  };
  const sendRateToWM = () => {
    setSendRate(true);
  };

  const ModalService = (item: any) => {
    return (
      <ModalComponent
        showModal={showServiceModal}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        handleOk={() => handleServiceOk(item)}
        okText=""
        handleCancel={handleServiceCancel}
        isModalOpen={isServiceModalOpen}
        width={1000}
        maskClosable={true}
      >
        <div dir="rtl">
          {!showRate && (
            <>
              <div className="mt-5">
                <Card title={"مشخصات درخواست"}>
                  <p> نوع : {optionItem?.serviceName}</p>
                  <p> شماره درخواست : {optionItem?.requestId}</p>
                  <p>شهر : {optionItem?.cityName}</p>
                  <p>
                    وضعیت درخواست :{" "}
                    {tabItem == 1 ? "در حال یافتن متخصص" : "در حال انجام"}
                  </p>
                </Card>
              </div>
              <div className="mt-2 mb-3">
                <Card title={"تقویم زمانی"}>
                  <p> تاریخ درخواست : {optionItem?.dateRequest}</p>
                  <p> تاریخ انجام : {optionItem?.dateRequest}</p>
                </Card>
              </div>
              {workMasters.length > 0 && tabItem == 1 ? (
                <div className="best-restaurants gap">
                  <div className="container">
                    <div className="row">
                      {workMasters.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="col-lg-12"
                            data-aos="flip-up"
                            data-aos-delay="200"
                            data-aos-duration="300"
                          >
                            <div className="logos-card restaurant-page ">
                              <div className="flex">
                                <div className="flex items-center justify-center">
                                  <img
                                    src="/assets/img/user.jpeg"
                                    alt=""
                                    className="box-one-img"
                                  />
                                </div>
                                <div className="cafa">
                                  <div className="flex items-center justify-center xs:flex-col">
                                    <h2 className="text-[25px] ml-2 mb-0">
                                      {item.expertName}
                                    </h2>
                                    <div>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-regular fa-star"></i>
                                    </div>
                                  </div>
                                  <div className="cafa-button">
                                    <p>{item.serviceName}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="mb-2 flex items-center justify-center">
                                  <h6 className="ml-2">حدود قیمت دستمزد :</h6>
                                  <span>
                                    {numberWithCommas(item.temporaryCostWage)}{" "}
                                    تومان
                                  </span>
                                </div>
                                <div className="mb-2 flex items-center justify-center">
                                  <h6 className="ml-2">حدود قیمت تجهیزات :</h6>
                                  <span>
                                    {numberWithCommas(
                                      item.temporaryCostEquipment
                                    )}{" "}
                                    تومان
                                  </span>
                                </div>
                              </div>
                              <button
                                className="button button-2"
                                onClick={() => {
                                  setConfirmRequest(item.expertId);
                                }}
                              >
                                انتخاب
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {tabItem == 2 && (
                <div dir="rtl" className="mb-3">
                  <Button type="primary" onClick={() => requestIsDone()}>
                    کار انجام شد
                  </Button>
                </div>
              )}
            </>
          )}
          {!showRate && (
            <div dir="rtl">
              <Table columns={columns2} dataSource={getResCustomer} />
            </div>
          )}
          {showRate && tabItem == 2 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px]">امتیاز شما به استاد کار</h3>
              <RateComponent rate={rate} setRate={setRate} />
              <TextArea
                onChange={(e) => setOpinion(e.target.value)}
                placeholder="ثبت نظر برای کارشناس"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <Button
                type="primary"
                className="w-40"
                onClick={() => sendRateToWM()}
              >
                ثبت امتیاز
              </Button>
            </div>
          )}
        </div>
      </ModalComponent>
    );
  };
  const ModalLogin = () => {
    return (
      <>
        <ModalComponent
          showModal={showLoginModalF}
          handleOk={handleLoginOk}
          okText=""
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "block" } }}
          handleCancel={handleLoginCancel}
          isModalOpen={showLoginModal}
          width={300}
          maskClosable={true}
        >
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <CostomInput
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="نام و نام خانوادگی"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="number"
              rules={[{ required: true, message: "شماره تماس" }]}
            >
              <CostomInput
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="number"
                placeholder="شماره تماس"
                onChange={(e: any) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
        </ModalComponent>
        <ModalComponent
          showModal={showSubmitModalF}
          handleOk={handleSubmitOk}
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "block" } }}
          handleCancel={handleSubmitCancel}
          okText=""
          isModalOpen={submitCode}
          width={300}
          maskClosable={true}
        >
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <CostomInput
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="text"
                onChange={(e: any) => {
                  setCode(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
        </ModalComponent>
      </>
    );
  };
  const goToHome = () => {
    router.replace("/");
  };
  return (
    <>
      <header className="py-[10px]">
        <div className="container">
          <nav className={styles.nav}>
            <div className={styles.childs}>
              <input
                type="checkbox"
                id="nav_check"
                className={styles.nav_check}
                onClick={() => {
                  setShowNav(!showNav);
                }}
              />
              <div className={styles.nav_btn}>
                <label
                  htmlFor="nav_check"
                  className={showNav ? styles.mg_nav : ""}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </label>
              </div>

              {showNav ? (
                <ul className={styles.nav_list2}>
                  <li className={`navbar-dropdown`}>
                    <Link href="/">صفحه اصلی</Link>
                  </li>
                  <li className={`navbar-dropdown`}>
                    <Link href="/about-us">درباره ما</Link>
                  </li>
                  <li className={`navbar-dropdown`}>
                    <Link href="/contact-us">تماس باما</Link>
                  </li>
                </ul>
              ) : (
                <>
                  <Button type="primary" onClick={() => signOut()}>
                    خروج
                  </Button>
                  <ul className={styles.nav_list}>
                    <li className={`navbar-dropdown`}>
                      <Link href="/">صفحه اصلی</Link>
                    </li>
                    <li className={`navbar-dropdown`}>
                      <Link href="/about-us">درباره ما</Link>
                    </li>
                    <li className={`navbar-dropdown`}>
                      <Link href="/contact-us">تماس باما</Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
            {!showNav && (
              <div className={styles.nav_header}>
                <div className={styles.nav_title}>
                  <Link href="/">
                    <img
                      src="/assets/img/logo.jpg"
                      alt=""
                      className="w-20 h-20"
                    />
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
      <section
        className="hero-section about gap no-padd"
        style={{ backgroundImage: "url(assets/img/background-1.png)" }}
      >
        <div className="container xs:max-:">
          <Layout
            style={{
              background: "#fff",
            }}
          >
            <div className="xs:hidden md:block">
              <Sider width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["درخواست های من"]}
                  style={{ height: "100%" }}
                  items={items}
                  onClick={onClick}
                />
              </Sider>
            </div>
            <div className="tab_navigation sm:hidden xs:flex bottom-0 right-0 fixed z-10">
              {items.map((item: any, index) => {
                return (
                  <div
                    key={index}
                    className="button_navigation active"
                    onClick={() => {
                      setMenuItem(item.key);
                    }}
                  >
                    <div
                      className={`text-[32px] ${
                        menuItem == item.key
                          ? "text-white  font-black"
                          : "text-[#ffffff80]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div
                      className={`text ${
                        menuItem == item.key
                          ? "text-white font-black"
                          : "text-[#ffffff80]"
                      }`}
                    >
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
            {menuItem == "1" ? (
              <Content
                style={{ padding: "0 24px", minHeight: 280 }}
                className="xs:mb-[100px]"
              >
                <div className="tabs-img-back" style={{ marginTop: "20px" }}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div
                        className="Provides"
                        // data-aos="fade-up"
                        // data-aos-delay="200"
                        // data-aos-duration="300"
                      >
                        <div
                          className="nav nav-pills me-3"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          {serviceTab.map((item, index) => {
                            return (
                              <button
                                key={index}
                                className={
                                  item.typeStatusCustomerId === tabItem
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                id={`v-pills-${index}-tab`}
                                data-bs-toggle={`pill${index}`}
                                data-bs-target={`#v-pills-${index}`}
                                type="button"
                                role="tab"
                                aria-controls={`v-pills-${index}`}
                                aria-selected={
                                  item.typeStatusCustomerId === tabItem
                                    ? "true"
                                    : "false"
                                }
                                onClick={() => {
                                  setTabItem(item.typeStatusCustomerId);
                                }}
                              >
                                {item.typeStatusName}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="tab-content" id="v-pills-tabContent">
                        {/* {getReqCustomer.map((item: any, index: number) => { */}
                        {/* return ( */}
                        <div
                          className="tab-pane fade show active"
                          id="v-pills-home"
                          role="tabpanel"
                          aria-labelledby="v-pills-home-tab"
                        >
                          <Table
                            columns={columns}
                            dataSource={getReqCustomer}
                            onChange={onChange}
                            scroll={{ x: 700 }}
                          />
                          {/* {ModalService(item)} */}
                        </div>
                        {/* );
                      })} */}
                      </div>
                    </div>
                  </div>
                </div>
              </Content>
            ) : menuItem == "2" ? (
              <Content
                style={{ padding: "0 24px", minHeight: 280 }}
                className="xs:mb-[100px]"
              >
                <div className="tabs-img-back">
                  <div className="container">
                    <div className="home">
                      <div className="home-ctn ctn">
                        <div className="">
                          <img
                            src={BASE_IMAGE_URL + customerInfo?.imagePath}
                            alt=""
                            className="box-one-img mb-3"
                          />
                          <p className="text-[24px]">
                            {customerInfo?.customerName}
                          </p>
                          <h3>تاریخ تولد : {customerInfo?.birthDate}</h3>
                          <h5>شماره تماس : {customerInfo?.mobile}</h5>
                          <Button
                            type="primary"
                            onClick={() => {
                              setShowEditModal(true);
                            }}
                          >
                            ویرایش پروفایل
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Content>
            ) : menuItem == "3" ? (
              <Content
                style={{ padding: "0 24px", minHeight: 280 }}
                className="xs:mb-[100px]"
              >
                <div className="tabs-img-back" style={{ marginTop: "20px" }}>
                  <div className="row">
                    <div className="col-lg-12">
                      <Table
                        columns={scoreColumns}
                        dataSource={scoreForCustomer}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </Content>
            ) : (
              <>
                <div className="py-[30px] px-3 min-h-80">
                  <p>در حال ویرایش...</p>
                </div>
              </>
            )}
          </Layout>
        </div>
      </section>
      <FooterComponent />
      <EditProfile
        showEditModal={showEditModal}
        customerInfo={customerInfo}
        setShowEditModal={setShowEditModal}
        setUpdateCustomerInfo={setUpdateCustomerInfo}
      />
      {ModalService(optionItem?.requestId)}
      {ModalLogin()}
    </>
  );
}

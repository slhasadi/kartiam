"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalComponent = dynamic(
  () => import("../global-components/modal/modal"),
  {
    ssr: false,
  }
);
import { BASE_API_URL, BASE_IMAGE_URL, ZIBAL_PAY } from "../../../globals";
import { useRouter } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  CommentOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Button, Dropdown, Layout, Menu, Space } from "antd";
import FooterComponent from "../global-components/layout/footer";
import {
  AcceptRuleExpert,
  ComputingCostWage,
  GetAddressExpert,
  GetExpertServices,
  GetInfoWorkMaster,
  GetListRequestForExpert,
  GetScoreExpert,
  GetStatusTypeWorkMaster,
  RegisterScoreExpert,
  RequestExpert,
} from "../../../network/work-master";
import { useDispatch, useSelector } from "react-redux";
import { getWorkMasterInfo } from "../../../redux/slices/workMasterSlice";
import { toast } from "react-toastify";
import { numberWithCommas } from "../../../utils/functions";
import styles from "./workmaster.module.css";
import dynamic from "next/dynamic";
import ExpertProfile from "./components/profile";
import ExpertComments from "./components/coments";
import ExpertAddress from "./components/address";
import ExpertRequests from "./components/requests";
import ExpertHeader from "./components/header";
import ExpertServices from "./components/services";
import AddWmAddress from "./components/add-wm-address";
import EditExperts from "./components/edit-experts";
import EditWmProfile from "./components/edit-wm-profile";
import EditCertificates from "./components/edit-certificates";
import Link from "next/link";
const ExpertRulesComponent = dynamic(
  () => import("./components/expert-rules"),
  {
    ssr: false,
  }
);

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
interface DataType {
  key: React.Key;
  row: React.Key;
  reqNumber: string;
  reqKind: string;
  reqDate: string;
}
const WorkMaster = () => {
  const workMaster = useSelector((state: any) => state.workMaster?.workMaster);
  const [serviceList, setServiceList] = useState({});
  const [questionList, setQuestionList] = useState<any>([]);
  const [getReqCustomer, setReqCustomer] = useState<any>([]);
  const [getResCustomer, setResCustomer] = useState<any>([]);
  const [showFactor, setShowFactor] = useState(false);
  const [submitData] = useState(false);
  const [sendResponse, setSendResponse] = useState(false);
  const [sendFinalResponse, setSendFinalResponse] = useState(false);
  const [costWage, setCostWage] = useState("");
  const [costEquipment, setCostEquipment] = useState("");
  const [finalCostWage, setFinalCostWage] = useState("");
  const [finalCostEquipment, setFinalCostEquipment] = useState("");
  const [scoreForExpert, setScoreForExpert] = useState<any[]>([]);
  const [addressForExpert, setAddressForExpert] = useState<any[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [showWmEditModal, setShowWmEditModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showAddWmAddressModal, setShowAddWmAddressModal] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [clickedPay, setClickedPay] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [optionItem, setOptionItem] = useState(0);
  const [acceptRule, setAcceptRule] = useState(false);
  const [rate, setRate] = useState(4);
  const [answersData] = useState<any[]>([]);
  const [serviceTab, setServiceTab] = useState<any[]>([]);
  const [experts, setExperts] = useState<any[]>([]);
  const [wmInfo, setWmInfo] = useState<any>();
  const [phoneNumber] = useState("");
  const [name] = useState("");
  const [wmId, setWmId] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [opinion, setOpinion] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [sendRate, setSendRate] = useState(false);
  const [isPaid] = useState(false);
  const [showCalButton, setShowCalButton] = useState(true);
  const [updateWmInfo, setUpdateWmInfo] = useState(false);
  const [idParams] = useState(0);
  const [wmCostWage, setWmCostWage] = useState({} as any);
  const [code] = useState(0);
  const [menuItem, setMenuItem] = useState<any>("1");

  const [tabItem, setTabItem] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(getWorkMasterInfo("wm-dashboard") as any);
  }, []);
  useEffect(() => {
    if (Object.keys(workMaster).length > 0) {
      // setHasWorkMaster(true);
    }
  }, [workMaster]);
  const signOut = () => {
    dispatch(getWorkMasterInfo("wm-dashboard") as any);
    localStorage.clear();
    router.replace("/");
  };
  const menuItems: MenuItem[] = [
    getItem("درخواست ها ", "1", <FileOutlined />),
    getItem("پروفایل", "2", <UserOutlined />),
    getItem("نظرات", "3", <CommentOutlined />),
    getItem("آدرس", "4", <EnvironmentOutlined />),
    // getItem("گزارشات", "5", <FileOutlined />),
  ];
  const onChange: TableProps<DataType>["onChange"] = () => {};

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
      dataIndex: "expertOpinion",
    },
  ];
  const columns2: ColumnsType<DataType> = [
    {
      title: "سوالات مربوط به سرویس",
      dataIndex: "questionText",
    },
    {
      title: "پاسخ های مشتری",
      dataIndex: "answerText",
    },
  ];
  const items: MenuItem[] = [
    {
      label: <p className="mb-0 text-center">{wmInfo?.expertName}</p>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <p className="mb-0 text-center">
          امتیاز:{" "}
          <span className="text-[#f29f05] text-[23px]">
            {wmInfo?.score !== null ? wmInfo?.score : 0}
          </span>
        </p>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button type="primary" className="w-full" onClick={() => signOut()}>
          خروج
        </Button>
      ),
      key: "3",
    },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    const ruleStorage = localStorage.getItem("accept-rule");
    if (!ruleStorage) {
      setShowRulesModal(true);
    }
    if (token) {
      GetStatusTypeWorkMaster().then((response) => {
        setServiceTab(response.data);
      });
    } else {
      router.replace("/");
    }
  }, []);
  useEffect(() => {
    if (menuItem == "3") {
      GetScoreExpert().then((res) => {
        setScoreForExpert(res.data);
      });
    }
    if (menuItem == "4") {
      GetAddressExpert().then((res) => {
        setAddressForExpert(res.data);
      });
    }
  }, [menuItem]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (idParams > 0) {
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
  }, [idParams]);
  useEffect(() => {
    GetListRequestForExpert(tabItem).then((response) => {
      setReqCustomer(response.data);
    });
  }, [tabItem]);
  useEffect(() => {
    if (clickedPay && serviceId) {
      axios({
        method: "post",
        data: {
          merchant: "65aba092c5d2cb000d477ac9",
          amount: Number(wmCostWage?.shareCost),
          callbackUrl: `http://localhost:3000/workmaster?reqid=${serviceId}`,
          description: "kartiam.com test",
          orderId: serviceId,
          mobile: wmInfo?.mobile,
        },
        url: ZIBAL_PAY,
        headers: {},
      }).then((response: any) => {
        console.log(response);

        if (response?.data?.message == "success") {
          router.replace(
            `https://gateway.zibal.ir/start/${response?.data?.trackId}`
          );
        }
      });
    }
  }, [clickedPay]);
  useEffect(() => {
    if (isServiceModalOpen) {
      setCostWage("");
      setCostEquipment("");
      setFinalCostWage("");
      setFinalCostEquipment("");
      setShowFactor(false);
      setShowRate(false);
      const token = localStorage.getItem("token");
      axios
        .get(
          `${BASE_API_URL}GetAnswerCustomerForDashboard?RequestNumber=${optionItem}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setResCustomer(response.data);
        });
    }
  }, [isServiceModalOpen]);
  useEffect(() => {
    if (sendResponse) {
      if (costWage && costEquipment && wmId && serviceId) {
        const data = {
          workMasterId: wmId,
          requestNumber: serviceId,
          temporaryCostWage: costWage,
          temporaryCostEquipment: costEquipment,
        };
        RequestExpert(data).then((response) => {
          setIsServiceModalOpen(false);
          setShowRate(true);
          toast.success("با موفقیت ثبت شد", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCostEquipment("");
          setCostWage("");
          GetListRequestForExpert(tabItem).then((response) => {
            setReqCustomer(response.data);
          });
        });
      } else {
        toast.error("لطفا حدود قیمت را وارد کنید", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }, [sendResponse]);
  useEffect(() => {
    if (sendFinalResponse) {
      if (
        finalCostWage &&
        finalCostEquipment &&
        wmId &&
        serviceId &&
        showFactor
      ) {
        const data = {
          workMasterId: wmId,
          requestNumber: serviceId,
          finalCostWage: finalCostWage,
          finalCostEquipment: finalCostEquipment,
        };
        RequestExpert(data).then((response) => {
          setShowFactor(false);
          setShowRate(true);
          toast.success("با موفقیت ثبت شد", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          GetListRequestForExpert(tabItem).then((response) => {
            setReqCustomer(response.data);
          });
        });
      } else {
        toast.error("لطفا قیمت قطعی را وارد کنید", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }, [sendFinalResponse]);
  useEffect(() => {
    if (showFactor) {
      if (finalCostWage && finalCostEquipment && wmId && serviceId) {
        const costWage = Number(finalCostWage) + Number(finalCostEquipment);
        ComputingCostWage(costWage).then((response) => {
          setWmCostWage(response.data);
          setShowCalButton(false);
        });
      } else {
        toast.error("لطفا قیمت قطعی را وارد کنید", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }, [showFactor]);
  useEffect(() => {
    if (idParams > 0 && questionList.length === answersData.length) {
      setIsServiceModalOpen(false);
    }
  }, [answersData]);
  useEffect(() => {
    if (code > 0 && submitData) {
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
        });
    }
  }, [submitData]);
  useEffect(() => {
    if (sendRate) {
      const data = {
        requestNumber: optionItem,
        // customerId: optionItem.customerId,
        expertId: wmId,
        score: rate,
        expertOpinion: opinion,
      };
      RegisterScoreExpert(data).then((response) => {
        setSendRate(false);
        setIsServiceModalOpen(false);
        setOpinion("");
        setRate(4);
        setShowRate(false);
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
        GetListRequestForExpert(tabItem).then((response) => {
          setReqCustomer(response.data);
        });
      });
    }
  }, [sendRate]);
  useEffect(() => {
    if (updateWmInfo || menuItem == "2") {
      GetInfoWorkMaster().then((response) => {
        setWmInfo(response.data);
        GetExpertServices().then((response) => {
          setExperts(response.data);
          setUpdateWmInfo(false);
        });
      });
    }
  }, [updateWmInfo, menuItem]);

  useEffect(() => {
    if (acceptRule) {
      AcceptRuleExpert().then((response) => {
        if (response) {
          localStorage.setItem("accept-rule", "true");
        }
      });
    }
  }, [acceptRule]);
  const showServiceModal = () => {
    if (questionList.length > 0) {
      setIsServiceModalOpen(true);
    }
  };
  const handleServiceOk = (item: any) => {
    if (tabItem == 1) {
      setSendResponse(true);
    } else if (tabItem == 3) {
      setSendFinalResponse(true);
      setFinalCostEquipment("");
      setFinalCostWage("");
    }
    setWmId(item.expertId);
    setServiceId(item.requestNumber);
  };
  const handleServiceCancel = () => {
    setIsServiceModalOpen(false);
    setFinalCostEquipment("");
    setFinalCostWage("");
  };
  const showRulesModalFunc = () => {
    setShowRulesModal(true);
  };
  const handleRulesCancel = () => {
    // setShowRulesModal(false);
  };
  const handleRuleOk = () => {
    setShowRulesModal(false);
    setAcceptRule(true);
  };
  const sendRateToWM = () => {
    setSendRate(true);
    setIsServiceModalOpen(false);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setMenuItem(e.key);
  };
  const getFactor = (item: any) => {
    setShowFactor(true);
    setWmId(item.expertId);
    setServiceId(item.requestNumber);
  };

  const rulesModal = () => {
    return (
      <>
        <ModalComponent
          showModal={showRulesModalFunc}
          handleOk={handleRuleOk}
          okButtonProps={{ style: { display: "block" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          handleCancel={handleRulesCancel}
          okText="با قوانین سایت موافقم"
          isModalOpen={showRulesModal}
          width={900}
          maskClosable={false}
        >
          <ExpertRulesComponent />
        </ModalComponent>
      </>
    );
  };

  return (
    <>
      {/* <ExpertHeader
        workMaster={workMaster}
        getWorkMasterInfo={getWorkMasterInfo}
      /> */}
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
                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <img
                        src={BASE_IMAGE_URL + wmInfo?.imagePath}
                        alt={wmInfo?.expertName}
                        className="w-[42px] h-[42px] rounded-full border"
                      />
                    </a>
                  </Dropdown>
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
        className="hero-section no_padd about gap"
        style={{ backgroundImage: "url(assets/img/background-1.png)" }}
      >
        <div className="container">
          <Layout
            className="shadow-sm"
            style={{
              background: "#fff",
            }}
          >
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                items={menuItems}
                onClick={onClick}
              />
            </Sider>
            <div className="tab_navigation sm:hidden xs:flex bottom-0 right-0 fixed z-10">
              {menuItems.map((item: any, index) => {
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
              <ExpertRequests
                serviceTab={serviceTab}
                tabItem={tabItem}
                setTabItem={setTabItem}
                getReqCustomer={getReqCustomer}
                setOptionItem={setOptionItem}
                setServiceList={setServiceList}
                setIsServiceModalOpen={setIsServiceModalOpen}
              />
            ) : menuItem == "2" ? (
              <ExpertProfile
                wmInfo={wmInfo}
                experts={experts}
                setShowWmEditModal={setShowWmEditModal}
                setShowExpertModal={setShowExpertModal}
                setShowCertificateModal={setShowCertificateModal}
              />
            ) : menuItem == "3" ? (
              <ExpertComments
                scoreColumns={scoreColumns}
                scoreForExpert={scoreForExpert}
                onChange={onChange}
              />
            ) : menuItem == "4" ? (
              <ExpertAddress
                addressForExpert={addressForExpert}
                setShowAddWmAddressModal={setShowAddWmAddressModal}
              />
            ) : (
              ""
            )}
          </Layout>
        </div>
      </section>
      <FooterComponent />
      <EditWmProfile
        showWmEditModal={showWmEditModal}
        setShowWmEditModal={setShowWmEditModal}
        workMaster={workMaster}
        setUpdateWmInfo={setUpdateWmInfo}
      />
      <EditExperts
        showExpertModal={showExpertModal}
        setShowExpertModal={setShowExpertModal}
        setExperts={setExperts}
      />
      <EditCertificates
        showCertificateModal={showCertificateModal}
        setShowCertificateModal={setShowCertificateModal}
        workMaster={workMaster}
        setUpdateWmInfo={setUpdateWmInfo}
      />
      <AddWmAddress
        showAddWmAddressModal={showAddWmAddressModal}
        setShowAddWmAddressModal={setShowAddWmAddressModal}
        setAddressForExpert={setAddressForExpert}
      />
      <ExpertServices
        showServiceModal={showServiceModal}
        showRate={showRate}
        showFactor={showFactor}
        isPaid={isPaid}
        tabItem={tabItem}
        handleServiceOk={handleServiceOk}
        handleServiceCancel={handleServiceCancel}
        isServiceModalOpen={isServiceModalOpen}
        item={serviceList}
        costWage={costWage}
        setCostWage={setCostWage}
        finalCostWage={finalCostWage}
        setFinalCostWage={setFinalCostWage}
        showCalButton={showCalButton}
        costEquipment={costEquipment}
        setCostEquipment={setCostEquipment}
        wmCostWage={wmCostWage}
        numberWithCommas={numberWithCommas}
        serviceId={serviceId}
        getFactor={getFactor}
        finalCostEquipment={finalCostEquipment}
        setFinalCostEquipment={setFinalCostEquipment}
        getResCustomer={getResCustomer}
        columns2={columns2}
        setRate={setRate}
        rate={rate}
        setOpinion={setOpinion}
        sendRateToWM={sendRateToWM}
        setClickedPay={setClickedPay}
      />
      {rulesModal()}
      {/* {ModalLogin()} */}
    </>
  );
};
export default WorkMaster;

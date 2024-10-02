"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Auth from "../auth";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import NextNProgress from "nextjs-progressbar";
import { getUserInfo } from "../../../../redux/slices/userSlices";
import { getWorkMasterInfo } from "../../../../redux/slices/workMasterSlice";
import Link from "next/link";
import styles from "./layout.module.css";

const LayoutComponent = () => {
  const user = useSelector((state: any) => state.user?.user);
  const workMaster = useSelector((state: any) => state.workMaster?.workMaster);
  // const [userData, setUserData] = useState<any>({});
  const [submitButton, setSubmitButton] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [btnText, setBtnText] = useState("ورود");

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (submitButton) {
      dispatch(getUserInfo("layout") as any);
      dispatch(getWorkMasterInfo("layout") as any);
    }
  }, [submitButton]);

  useEffect(() => {
    if (submitButton) {
      const token = localStorage.getItem("token");

      if (user && Object.keys(user).length > 0 && token) {
        router.push("/customer");
        setBtnText("داشبورد");
      } else if (workMaster && Object.keys(workMaster).length > 0 && token) {
        setBtnText("داشبورد");

        router.push("/workmaster");
      } else {
        setShowLoginModal(true);
      }
    }
  }, [submitButton, user, workMaster]);
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setBtnText("داشبورد");
    } else if (workMaster && Object.keys(workMaster).length > 0) {
      setBtnText("داشبورد");
    }
  }, [user, workMaster]);

  useEffect(() => {
    const city = localStorage.getItem("city");
    const cityName = localStorage.getItem("cityName");
    if (!city) {
      localStorage.setItem("city", "85");
    }
    if (!cityName) {
      localStorage.setItem("cityName", "تهران");
    }
  }, []);
  function openCustomerLoginModal() {
    setSubmitButton(true);
  }

  return (
    <>
      <header>
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
                  <li
                    className={`navbar-dropdown ${pathname == "/" && "active"}`}
                  >
                    <Link href="/">صفحه اصلی</Link>
                  </li>
                  <li
                    className={`navbar-dropdown ${
                      pathname == "/about-us" && "active"
                    }`}
                  >
                    <Link href="/about-us">درباره ما</Link>
                  </li>
                  <li
                    className={`navbar-dropdown ${
                      pathname == "/contact-us" && "active"
                    }`}
                  >
                    <Link href="/contact-us">تماس باما</Link>
                  </li>
                </ul>
              ) : (
                <>
                  <div className="">
                    <div className="extras bag2">
                      {pathname == "/specialists/[slug]" ? (
                        <Link className="button button-2" href="/">
                          صفحه اصلی
                        </Link>
                      ) : (
                        <button
                          className="button button-2"
                          onClick={openCustomerLoginModal}
                        >
                          {btnText}
                        </button>
                      )}
                    </div>
                  </div>
                  <ul className={styles.nav_list}>
                    <li
                      className={`navbar-dropdown ${
                        pathname == "/" && "active"
                      }`}
                    >
                      <Link href="/">صفحه اصلی</Link>
                    </li>
                    <li
                      className={`navbar-dropdown ${
                        pathname == "/about-us" && "active"
                      }`}
                    >
                      <Link href="/about-us">درباره ما</Link>
                    </li>
                    <li
                      className={`navbar-dropdown ${
                        pathname == "/contact-us" && "active"
                      }`}
                    >
                      <Link href="/contact-us">تماس باما</Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
            {!showNav && (
              <div className={styles.nav_header}>
                <div className={styles.nav_title}>
                  <a href="#">
                    <img
                      src="/assets/img/logo.jpg"
                      alt=""
                      className="w-20 h-20"
                    />
                  </a>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      <Auth
        setSubmitButton={setSubmitButton}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default LayoutComponent;

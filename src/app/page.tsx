"use client";
import React, { useEffect, useState } from "react";
import { Button, Space, Select, Steps, theme } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GetListCategoryService, GetListService } from "../../network/customer";
import ModalComponent from "./global-components/modal/modal";
import Cities from "./global-components/cities";
import FooterComponent from "./global-components/layout/footer";
import LayoutComponent from "./global-components/layout";
import CostomInput from "./global-components/costom-input";
import { GetServiceCategory } from "../../network/work-master";
import Link from "next/link";
import { BASE_IMAGE_URL } from "../../globals";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [serviceId, setServiceId] = useState(0);
  const [tabItem, setTabItem] = useState(1);
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };
  const steps = [
    {
      title: "اول",
      content: "محتوای-اول",
    },
    {
      title: "دوم",
      content: "محتوای-دوم",
    },
    {
      title: "سوم",
      content: "محتوای-سوم",
    },
    {
      title: "چهارم",
      content: "محتوای-چهارم",
    },
    {
      title: "پنجم",
      content: "محتوای-پنجم",
    },
  ];

  const items: any = steps.map((item: any) => ({
    key: item.title,
    title: item.title,
    step: item.typeAnswerId,
  }));
  const prev = () => {
    setCurrent(current - 1);
  };
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [serviceCategory, setServiceCategory] = useState([]);
  useEffect(() => {
    GetListService().then((response) => {
      setServiceList(response.data);
    });
    GetListCategoryService().then((res: any) => {
      setServiceCategory(res.data.listCategories);
    });
  }, []);
  const showServiceModal = () => {
    if (serviceId > 0) {
      router.push(`/specialists/${serviceId}`);
    } else {
      toast.error("لطفا ابتدا سرویس خود را انتخاب کنید", {
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
  };
  const handleServiceOk = () => {
    setIsServiceModalOpen(false);
  };
  const handleServiceCancel = () => {
    setIsServiceModalOpen(false);
  };
  const goToRegisterExpert = () => {
    router.push("https://registerexpert.kartiam.com");
  };

  const { token } = theme.useToken();
  const contentStyle: any = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const ModalService = () => {
    return (
      <ModalComponent
        showModal={showServiceModal}
        handleOk={handleServiceOk}
        okText=""
        handleCancel={handleServiceCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        isModalOpen={isServiceModalOpen}
        width={1000}
        maskClosable={true}
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              بعدی
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              // onClick={() => message.success("Processing complete!")}
            >
              تمام
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              قبلی
            </Button>
          )}
        </div>
      </ModalComponent>
    );
  };

  return (
    <>
      <LayoutComponent />
      <section className="hero-section gap">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="300"
            >
              <div className="restaurant">
                <h1>برای کارهای خود متخصصان حرفه‌ای و قابل اعتماد پیدا کنید</h1>
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است
                </p>
                <div className="tabs-img-back">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="Provides Provides-main">
                        <div
                          className="nav nav-pills"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <button
                            className={`nav-link ${tabItem == 1 && "active"}`}
                            onClick={() => {
                              setTabItem(1);
                            }}
                          >
                            یافتن متخصصین
                          </button>
                          <button
                            className={`nav-link ${tabItem == 2 && "active"}`}
                            onClick={() => {
                              setTabItem(2);
                            }}
                          >
                            ثبت نام متخصصین
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="tab-content" id="v-pills-tabContent">
                        {tabItem == 1 ? (
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
                                        width: "80%",
                                        height: "55px",
                                        border: "1px solid #d9d9d9",
                                        borderTopRightRadius: "5px",
                                        borderBottomRightRadius: "5px",
                                      }}
                                      placeholder="انتخاب کنید"
                                      optionFilterProp="children"
                                      filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                      }
                                      onChange={(label) => {
                                        setServiceId(label);
                                      }}
                                      filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                          .toLowerCase()
                                          .localeCompare(
                                            (optionB?.label ?? "").toLowerCase()
                                          )
                                      }
                                      options={serviceList.map((item: any) => ({
                                        value: item.serviceId,
                                        label: item.serviceName,
                                      }))}
                                    />

                                    <Cities />
                                  </Space.Compact>
                                </Space>
                                <a
                                  onClick={showServiceModal}
                                  className="button button-2"
                                >
                                  جستجو
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="tab-pane fade show active"
                            id="v-pills-messages"
                            role="tabpanel"
                            aria-labelledby="v-pills-messages-tab"
                          >
                            <div className="">
                              <div className="nice-select-one">
                                <p>
                                  در اینجا تعداد مشتری و میزان درآمد خود را
                                  افزایش دهید
                                </p>
                                <a
                                  href="#"
                                  className="button button-2"
                                  onClick={goToRegisterExpert}
                                >
                                  ثبت نام استادکار
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="400"
            >
              <div className="img-restaurant">
                <img
                  alt="man"
                  src="assets/img/wepik-export-20231026200431zJR0.png"
                />
                <div className="wilmington">
                  <img alt="img" src="assets/img/user.jpeg" />
                  <div>
                    <p className="mb-2">بهترین همکار یک ماه گذشته</p>
                    <h6>احمد اسفندیاری</h6>
                    <div>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star-half-stroke"></i>
                    </div>
                  </div>
                </div>
                <div className="wilmington location-restaurant">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    <h6 className="mb-2">خدمات تاسیسات</h6>
                    <p>در شهر تهران</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="works-section gap">
        <div className="container">
          <div
            className="hading"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="300"
          >
            <h2>دسته بندی</h2>
          </div>
          <div className="row align-items-center">
            <div className="sit-at-home-description">
              <ul className="food-dishes">
                {serviceCategory.map((item: any, index: number) => {
                  return (
                    <li key={index}>
                      <Link
                        className="flex flex-col items-center justify-center gap-2"
                        href={`/category/${item.serviceCategoryId}`}
                      >
                        <img
                          src={BASE_IMAGE_URL + item.imagePath}
                          alt=""
                          width={32}
                          height={32}
                        />
                        <span className="text-[12px]">
                          {item.serviceCategoryName}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="your-favorite-food gap">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-5"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="300"
            >
              <div className="food-photo-section">
                <img alt="img" src="assets/img/avy.png" />
                <a href="#" className="one">
                  <i className="fa-solid fa-burger"></i>رایانه ای
                </a>
                <a href="#" className="two">
                  <i className="fa-solid fa-cheese"></i>نظافت
                </a>
                <a href="#" className="three">
                  <i className="fa-solid fa-pizza-slice"></i>تاسیسات
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 offset-lg-1"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="400"
            >
              <div className="food-content-section">
                <h2>برترین خدمات با نظرات کاربران</h2>
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است
                </p>
                <a href="#" className="button button-2">
                  انتخاب کنید
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="news-section gap">
        <div className="container">
          <h2>آخرین اخبار و رویداد ها</h2>
          <div className="row">
            <div
              className="col-xl-6 col-lg-12"
              data-aos="flip-up"
              data-aos-delay="200"
              data-aos-duration="300"
            >
              <div className="news-posts-one">
                <img alt="man" src="assets/img/blog.jpeg" />
                <div className="quickeat">
                  <a href="#">اخبار</a>
                  <a href="#">منزل</a>
                </div>
                <h3>لیست وسایل مورد نیاز برای نظافت منزل</h3>
                <p>
                  ما قصد داریم در این مطلب، لیست لوازم شستشو و تمیزکاری را
                  به‌طور کامل در اختیار شما قرار دهیم. به این ترتیب می‌توانید
                  لوازم مورد نیاز خود را تهیه نمایید و در هنگام نیاز، آنها را به
                  کار ببرید. پس توصیه می‌کنیم تا پایان این مقاله از استادکار،
                  همراه ما بمانید
                </p>
                <a href="#">
                  بیشتر<i className="fa-solid fa-arrow-left"></i>
                </a>
                <ul className="data">
                  <li>
                    <h6>
                      <i className="fa-solid fa-user"></i>ادمین
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="fa-regular fa-calendar-days"></i>۴۰۲/۲/۲۵
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="fa-solid fa-eye"></i>۱۵۵
                    </h6>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-12"
              data-aos="flip-up"
              data-aos-delay="300"
              data-aos-duration="400"
            >
              <div className="news-post-two">
                <img alt="food-img" src="assets/img/blog.jpeg" />
                <div className="news-post-two-data">
                  <div className="quickeat">
                    <a href="#">اخبار</a>
                    <a href="#">خانه</a>
                  </div>
                  <h6>
                    <a href="single-blog.html">
                      وسایل نظافت منزل شامل چه مواردی است؟
                    </a>
                  </h6>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است
                  </p>
                  <ul className="data">
                    <li>
                      <h6>
                        <i className="fa-solid fa-user"></i>ادمین
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-regular fa-calendar-days"></i>۴۰۲/۳/۱۲
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-solid fa-eye"></i>۱۳۳
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="news-post-two">
                <img alt="food-img" src="assets/img/blog.jpeg" />
                <div className="news-post-two-data">
                  <div className="quickeat">
                    <a href="#">اخبار</a>
                    <a href="#">خانه</a>
                  </div>
                  <h6>
                    <a href="single-blog.html">
                      وسایل نظافت منزل شامل چه مواردی است؟
                    </a>
                  </h6>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است
                  </p>
                  <ul className="data">
                    <li>
                      <h6>
                        <i className="fa-solid fa-user"></i>ادمین
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-regular fa-calendar-days"></i>۴۰۲/۳/۱۲
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-solid fa-eye"></i>۱۳۳
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="news-post-two">
                <img alt="food-img" src="assets/img/blog.jpeg" />
                <div className="news-post-two-data">
                  <div className="quickeat">
                    <a href="#">اخبار</a>
                    <a href="#">خانه</a>
                  </div>
                  <h6>
                    <a href="single-blog.html">
                      وسایل نظافت منزل شامل چه مواردی است؟
                    </a>
                  </h6>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است
                  </p>
                  <ul className="data">
                    <li>
                      <h6>
                        <i className="fa-solid fa-user"></i>ادمین
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-regular fa-calendar-days"></i>۴۰۲/۳/۱۲
                      </h6>
                    </li>
                    <li>
                      <h6>
                        <i className="fa-solid fa-eye"></i>۱۳۳
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="subscribe-section">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="flip-up"
              data-aos-delay="200"
              data-aos-duration="300"
            >
              <div className="img-subscribe">
                <img alt="Illustration" src="assets/img/qq.png" />
              </div>
            </div>
            <div
              className="col-lg-5 offset-lg-1"
              data-aos="flip-up"
              data-aos-delay="300"
              data-aos-duration="400"
            >
              <div className="get-the-menu">
                <h2>
                  متخصصان محلی مورد اعتماد را برای همه کارهایی که باید انجام
                  دهید، پیدا کنید.
                </h2>
                <form>
                  <CostomInput
                    type="text"
                    name="email"
                    placeholder="آدرس ایمیل"
                    className="w-full sm:ml-0"
                  />
                  <button className="button button-2 mb-4">عضویت</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="LifeStyle" style={{ direction: "ltr" }}>
        <div className="container">
          <div className="ticker-02_section">
            <div className="ticker-02_wrapper">
              <div className="ticker-02_content">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
            </div>
            <div className="ticker-02_wrapper">
              <div className="ticker-02_content ticker-02_content--reverse">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content ticker-02_content--reverse">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content ticker-02_content--reverse">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content ticker-02_content--reverse">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content ticker-02_content--reverse">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
              <div className="ticker-02_content ticker-02_content--reverse">
                <div className="ticker-tag">تاسیسات</div>
                <div className="ticker-tag">شستشو</div>
                <div className="ticker-tag">حفاظت</div>
                <div className="ticker-tag">حمل و نقل</div>
                <div className="ticker-tag">آموزش</div>
                <div className="ticker-tag">ساختمان</div>
                <div className="ticker-tag">برنامه ریزی</div>
                <div className="ticker-tag">رایانه ای</div>
                <div className="ticker-tag">نظافت</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <FooterComponent />
      {ModalService()}
      {/* {ModalLogin()} */}
    </>
  );
}

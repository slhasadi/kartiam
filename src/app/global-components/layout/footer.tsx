"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const FooterComponent = () => {
  return (
    <>
      <footer className="gap no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="footer-description">
                <a href="#">
                  <img
                    src="/assets/img/logo.jpg"
                    alt=""
                    className="w-20 h-20"
                  />
                </a>
                <h2>برای کارهای خود متخصصان حرفه‌ای و قابل اعتماد پیدا کنید</h2>
                <p>
                  هدف اصلی پرشین استار پیدا کردن بهترین متخصص در کمترین زمان و
                  بدون محدودیت مکانی برای انواع نیازمندی های مشتریان می باشد.
                </p>
                <p>
                  با کمک پرشین استار می توانید در هر مکان و زمان که هستید نزدیک
                  ترین متخصص از کارگر ساده گرفته تا بهترین استاد کاران و
                  پیمانکاران را پیدا کنی و نیاز های خود و یا دوستان خود را بر
                  طرف کنی.
                </p>
                <p>
                  تیم پرشین استار برای اولین بار در ایران تمامی روستاها را نیز
                  تحت پوشش خود قرار داده است یعنی این امکان برای شما وجود دارد
                  که حتی اگر نیاز به متخصصی در یک روستا داشته باشید هیچ گونه
                  محدودیتی برای یافتن متخصص برای شما وجود ندارد و این مشکل بزرگ
                  توسط تیم پرشین استار با پشتیبانی ۲۴ ساعته برای شما فراهم
                  گردیده است.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="menu">
                <h4>دسترسی های سریع</h4>
                <ul className="footer-menu">
                  <li>
                    <Link href={"/"}>
                      صفحه اصلی <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href={"/about-us"}>
                      درباره ما<i className="fa-solid fa-arrow-left"></i>
                    </Link>
                  </li>
                  {/* <li>
                    <a href="restaurants.html">
                      خدمات<i className="fa-solid fa-arrow-left"></i>
                    </a>
                  </li> */}

                  <li>
                    <Link href={"/contact-us"}>
                      تماس با ما<i className="fa-solid fa-arrow-left"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="menu contacts">
                <h4>آدرس</h4>
                <div className="footer-location">
                  <i className="fa-solid fa-location-dot"></i>
                  <p>
                    دفتر مرکز شیراز: معالی آباد بلوار شریعتی روبروی پاساژ الوند
                    <br />
                    دفتر مرکزی بندرعباس: بلوار شهدا نبش بلوار جمهوری اسلامی
                    <br />
                    دفتر تهران: خیابان پاسداران خیابان مژده ساختمان ۴۵ طبقه دوم
                    واحد ۱۰۱۱
                  </p>
                </div>
                <a href="mailto:quickeat@mail.net">
                  <i className="fa-solid fa-envelope"></i>info@persiankar.com
                </a>
                {/* <a href="callto:+14253261627">
                  <i className="fa-solid fa-phone"></i>
                  شماره تلفن مرکزی: ۹۱۰۱۱۸۳۴-۰۲۱
                  <br />
                  <br />
                  پشتیبانی مشتریان داخلی ۱
                  <br />
                  <br />
                  ثبت سفارشات داخلی ۲
                </a> */}
              </div>
              <ul className="social-media">
                <li>
                  <a href="#">
                    <i className="fa-brands fa-telegram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </li>
              </ul>
              <div className="w-[120px] h-[120px]">
                <a
                  referrerPolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=727717&Code=ECQCgXECBftGt7wTozztDXOC0QudXkSM"
                >
                  <img
                    referrerPolicy="origin"
                    src="https://trustseal.enamad.ir/logo.aspx?id=727717&Code=ECQCgXECBftGt7wTozztDXOC0QudXkSM"
                    alt=""
                    style={{ cursor: "pointer" }}
                    data-code="ECQCgXECBftGt7wTozztDXOC0QudXkSM"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-two gap no-bottom">
            <p>Copyright © 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterComponent;

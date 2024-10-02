import LayoutComponent from "@/app/global-components/layout";
import FooterComponent from "@/app/global-components/layout/footer";
export default function ContactUs() {
  return (
    <>
      <LayoutComponent />
      <section className="about-section">
        <div className="container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <h2>ارتباط باما:</h2>
                </div>
                <div className="text">ایمیل  info@persiankar.com</div>

                <div className="btn-box mb-5 sec-title">
                  <p>
                    سند ارائه‌شده‌ی زیر، شرایط خدمات و سیاست‌های حریم شخصی ما را
                    تشریح می‌کند کاربر گرامی، باتوجه به اینکه تمامی خدمات
                    ارائه‌شده در مجموعه‌ی پرشین استار تابع قوانین مطروح در این
                    بخش است، مطالعه‌ی آن پیش از استفاده از خدمات الزامی بوده و
                    ثبت‌نام در این مجموعه به معنای پذیرش این شرایط و قبول کلیه‌ی
                    قوانین از طرف شما می‌باشد
                  </p>
                </div>
              </div>
            </div>

            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInLeft">
                <figure className="image-1">
                  <a href="#" className="lightbox-image" data-fancybox="images">
                    <img
                      src="https://i.ibb.co/QP6Nmpf/image-1-about.jpg"
                      alt=""
                    />
                  </a>
                </figure>
                <figure className="image-2">
                  <a href="#" className="lightbox-image" data-fancybox="images">
                    <img
                      src="https://i.ibb.co/JvN0NVB/image-2-about.jpg"
                      alt=""
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}

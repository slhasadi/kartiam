import FooterComponent from "@/app/global-components/layout/footer";
import LayoutComponent from "@/app/global-components/layout";
export default function AboutUs() {
  return (
    <>
      <LayoutComponent />
      <section className="about-section">
        <div className="container">
          <div className="row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <h2>درباره ما:</h2>
                </div>
                <div className="text">
                  پرشین استار این امکان را به کاربران خود می دهد تا هر خدمتی را
                  که در منزل مورد نیازشان است از طریق وبسایت و یا اپلیکیشن به
                  راحتی و در هر ساعتی از شبانه روز سفارش دهند. این خدمات از ریشه
                  تا شیشه ساختمان  وکارگر ساده گرفته تا بازسازی ونوسازی منزل
                  وتاسیسات منزل وکارخانه ها وتعمیرات وخدمات خودرو وپیمانکاری
                  وپرستاری ونظافت وباغبانی حمل و نقل وباربری را شامل می شوند.
                  این وب اپیکیشن تمام شهر و روستاهای ایران را تحت پوشش قرار داده
                  و هر استادکارومتخصص میتواند در محل سکونت خود و بدون داشتن
                  سرمایه چندان وفقط با داشتن تخصص وتهیه ابزار لازم درتخصص خود
                  مشغول به کار شود  وکارفرما: با انتخاب نوع سرویس مورد نیاز
                  میتواند در چند دقیقه اول به صورت همزمان از چندین استاد کار
                  قیمت بگیرد وبا توجه به ستاره بندی ونظرات کارفرمایان قبلی نسبت
                  به نحوه کار واخلاق استاد متخصص آگاهی لازم را داشته باشد وپرشین
                  استار بهترین،نزدیکترین،ارزانترین متخصص ها را به شما معرفی
                  می‌کند
                </div>
                <div className="btn-box mb-5 sec-title">
                  <span className="title">
                    پرشین استار انواع نیروهای خدماتی:
                  </span>
                  <p>
                    متخصص و معتمد را مستقیما به متقاضیان آن خدمات متصل می‌کند.
                  </p>
                </div>
                <div className="btn-box mb-5 sec-title">
                  <span className="title">از مهمترین اهداف این اپیکیشن:</span>
                  <p>
                    می‌توان به موارد زیر اشاره کرد: رفع دغدغه‌های مربوط به خدمات
                    برای مشتریان ایجاد تحول در کسب و کارها ایجاد اشتغال برای
                    بسیاری از کسانی که توانایی انجام کار فنی دارند، ولی به دلیل
                    نبودسیستم اطلاع رسانی جامع و دقیق ونبود سرمایه قادر به معرفی
                    خود و ارتباط با مشتری نهایی نیستند
                  </p>
                </div>

                <div className="btn-box">
                  {/* <a href="#" className="theme-btn btn-style-one">
                    Contact Us
                  </a> */}
                  <p>
                    پرشین استار فرصت مناسبی برای نیروهای نظافتی،نگهبانی
                    وکارگرساده، پرستاری، باغبانی، تعمیرات خودرو وحمل ونقل وساخت
                    یا ساختمان وکارخانه ها،وخدمات تاسیساتی ومتخصص ازطراحی نصب و
                    راه اندازی وخدمات بعدازنصب است که در هر زمان و مکانی که
                    مدنظرشان است، به کسب درآمد بپردازند.
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

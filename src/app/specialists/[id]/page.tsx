"use client";
import React, { useEffect, useState } from "react";
import ServiceRequest from "../../customer/components/service-request";
import LayoutComponent from "../../global-components/layout";
import { Button } from "antd";

const Service = ({ params }: { params: { id: any } }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [idParams, setIdParams] = useState<any>();
  const getSrarted = () => {
    setShowQuestions(true);
  };
  useEffect(() => {
    if (params.id) {
      setIdParams(params.id);
    }
  }, [params]);
  return (
    <>
      {!showQuestions ? (
        <>
          <LayoutComponent />
          <div className="hero-section about gap padd-fix">
            <div className="container q-container">
              <div className="row align-items-center">
                <div
                  className="col-lg-12 parent-q"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="400"
                >
                  <div className="parent-questions flex-col text-justify">
                    <h2 className="w-full text-right text-2xl mt-3">
                      توضیحات درخواست خدمات
                    </h2>
                    <p className="xs:mb-[100px]">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                      شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
                      طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                      ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
                      موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی
                      سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
                      قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                      صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
                      متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                      و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                      هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و
                      سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را
                      می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
                      رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
                      فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
                      رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و
                      جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
                      استفاده قرار گیرد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 right-0 w-full p-3 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0)] z-10">
            <div className="flex items-center justify-center">
              <Button
                type="primary"
                className="bag button w-full text-center max-w-[400px]"
                onClick={() => getSrarted()}
              >
                شروع
              </Button>
            </div>
          </div>
        </>
      ) : (
        <ServiceRequest idParams={idParams} />
      )}
    </>
  );
};

export default Service;

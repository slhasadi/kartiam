"use client";
import LayoutComponent from "@/app/global-components/layout";
import FooterComponent from "@/app/global-components/layout/footer";
import React, { useEffect, useState } from "react";
import { GetListCategoryServiceById } from "../../../../network/customer";
import { BASE_IMAGE_URL } from "../../../../globals";
import Image from "next/image";
import Link from "next/link";

const CategoryItem = ({ params }: { params: { id: any } }) => {
  const [serviceCategory, setServiceCategory] = useState({} as any);
  useEffect(() => {
    if (params.id) {
      GetListCategoryServiceById(params.id).then((res: any) => {
        setServiceCategory(res.data.listCategories[0]);
      });
    }
  }, [params]);
  return (
    <>
      <LayoutComponent />
      {Object.keys(serviceCategory).length > 0 && (
        <section className="about-section">
          <div className="container">
            <div className="row">
              <div className="content-column col-lg-12 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="sec-title sec-title-2">
                    <h2>{serviceCategory.serviceCategoryName}</h2>
                  </div>
                  <p className="text">{serviceCategory.description}</p>
                </div>
                <div className="row align-items-center">
                  <div className="sit-at-home-description">
                    <ul className="food-dishes">
                      {serviceCategory?.listServices.map(
                        (item: any, index: number) => {
                          return (
                            <li
                              key={index}
                              className="border bottom-1 h-[80px] flex items-center justify-center"
                            >
                              <Link
                                className="flex flex-col gap-2"
                                href={`/specialists/${item.serviceId}`}
                              >
                                {/* <i className="fa-solid fa-burger"></i> */}
                                <span className="text-[12px]">
                                  {item.serviceName}
                                </span>
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <FooterComponent />
    </>
  );
};

export default CategoryItem;

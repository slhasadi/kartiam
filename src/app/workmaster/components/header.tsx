"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const ExpertHeader = ({ workMaster, getWorkMasterInfo }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const signOut = () => {
    dispatch(getWorkMasterInfo("wm-dashboard") as any);
    localStorage.clear();
    router.replace("/");
  };
  const goToHome = () => {
    router.replace("/");
  };
  return (
    <header>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="extras bag bagest">
              <div className="flex gap-2">
                <Button type="primary" onClick={() => goToHome()}>
                  صفحه اصلی
                </Button>
              </div>
              <div className="flex gap-2">
                <p>استادکار عزیز آقای ، {workMaster?.expertName}</p>
                <Button type="primary" onClick={() => signOut()}>
                  خروج
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExpertHeader;

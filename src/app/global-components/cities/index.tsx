"use client";
import React, { useEffect, useState } from "react";
import ModalComponent from "../modal/modal";
import { GetCity, GetRegion } from "../../../../network/customer";
import { Button, Input, List } from "antd";
import CostomInput from "../costom-input";

const Cities = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityList, setCityList] = useState([] as any[]);
  const [regionList, setRegionList] = useState([] as any[]);
  const [cityListPlus, setCityListPlus] = useState<any[]>([] as any[]);
  const [regionListPlus, setRegionListPlus] = useState<any[]>([] as any[]);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [region, setRegion] = useState(0);

  useEffect(() => {
    if (cityList.length) {
      const filterCityResult = cityList.filter(
        (word) => word.cityName.replace(/\s/g, "").indexOf(inputValue) !== -1
      );
      setCityListPlus(filterCityResult);
    }
    if (!cityList.length) {
      const filterResult = regionList.filter(
        (word) => word.regionName.replace(/\s/g, "").indexOf(inputValue) !== -1
      );
      setRegionListPlus(filterResult);
    }

    if (!inputValue && cityList.length) {
      GetCity(region).then((response) => {
        setCityList(response.data);
      });
    }
    if (!inputValue && !cityList.length) {
      GetRegion().then((response) => {
        setRegionList(response.data);
      });
    }
  }, [inputValue]);
  useEffect(() => {
    GetRegion().then((response) => {
      setRegionList(response.data);
      setRegionListPlus(response.data);
    });

    const cityNameVar = localStorage.getItem("cityName");
    if (cityNameVar) {
      setCityName(cityNameVar);
    }
  }, [isCityModalOpen]);
  useEffect(() => {
    if (region) {
      setInputValue("");
      GetCity(region).then((response) => {
        setCityList(response.data);
        setCityListPlus(response.data);
      });
    }
  }, [region]);
  useEffect(() => {
    const LSCity = localStorage.getItem("city");
    if (LSCity) {
      setCity(LSCity);
    }
    // if (LSCity && cityList.length > 0) {
    const cityName = cityList?.filter((id) => id.cityId == Number(LSCity))[0];

    if (cityName) {
      setCityName(cityName.cityName);
    }
    // }
  }, [cityList]);
  useEffect(() => {}, []);
  const handleCityOk = () => {
    setIsCityModalOpen(false);
  };

  const handleCityCancel = () => {
    setIsCityModalOpen(false);
    setCityListPlus([]);
    setCityList([]);
  };
  const showCityModal = () => {
    setIsCityModalOpen(true);
  };
  const ModalCities = () => {
    return (
      <ModalComponent
        showModal={showCityModal}
        handleOk={handleCityOk}
        handleCancel={handleCityCancel}
        okText=""
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        isModalOpen={isCityModalOpen}
        width={300}
        maskClosable={true}
      >
        <CostomInput
          placeholder="شهر مورد نظر را جستجو کنید"
          onChange={(e: any) => setInputValue(e.target.value)}
          value={inputValue}
        />

        {!cityList.length ? (
          <List
            itemLayout="horizontal"
            dataSource={regionListPlus}
            size="small"
            bordered
            style={{ maxHeight: "300px", overflow: "auto" }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <p
                      className="flex cursor-pointer"
                      onClick={() => {
                        setRegion(item.regionId);
                      }}
                    >
                      {item.regionName}
                    </p>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={cityListPlus}
            size="small"
            bordered
            style={{ maxHeight: "300px", overflow: "auto" }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <p
                      className="flex cursor-pointer"
                      onClick={() => {
                        setCityName(item.cityName);
                        localStorage.setItem("city", item.cityId);
                        localStorage.setItem("cityName", item.cityName);
                        setIsCityModalOpen(false);
                        setCityListPlus([]);
                        setCityList([]);
                      }}
                    >
                      {item.cityName}
                    </p>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </ModalComponent>
    );
  };
  const ButtonCity = () => {
    return (
      <Button
        style={{
          width: "auto",
          marginLeft: "0px",
          height: "55px",
          backgroundColor: "#fff",
        }}
        onClick={showCityModal}
      >
        <i
          className="fa-solid fa-location-dot"
          style={{ marginLeft: "5px" }}
        ></i>
        {cityName}
      </Button>
    );
  };
  return (
    <>
      {ButtonCity()}
      {ModalCities()}
    </>
  );
};

export default Cities;

"use client";
import React, { useState } from "react";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Flex, Rate } from "antd";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined style={{ fontSize: "66px" }} />,
  2: <FrownOutlined style={{ fontSize: "66px" }} />,
  3: <MehOutlined style={{ fontSize: "66px" }} />,
  4: <SmileOutlined style={{ fontSize: "66px" }} />,
  5: <SmileOutlined style={{ fontSize: "66px" }} />,
};
const desc = ["خیلی بد", "بد", "معمولی", "خوب", "عالی"];

const RateComponent = ({ rate, setRate }: any) => {
  return (
    <div className="flex-ul">
      <Rate
        defaultValue={4}
        tooltips={desc}
        character={({ index = 0 }) => customIcons[index + 1]}
        onChange={setRate}
        value={rate}
      />
      <br />
      {rate ? <span>{desc[rate - 1]}</span> : null}
    </div>
  );
};

export default RateComponent;

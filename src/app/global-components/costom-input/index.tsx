"use client";
import { Input } from "antd";
import React from "react";

const CostomInput = ({
  placeholder,
  type,
  prefix,
  onChange,
  className,
  style,
  value,
}: any) => {
  return (
    <>
      <Input
        status="warning"
        onChange={onChange && onChange}
        type={type ? type : "string"}
        prefix={prefix && prefix}
        size="large"
        placeholder={placeholder ? placeholder : ""}
        className={className ? className : ""}
        style={style ? style : ""}
        value={value && value}
      />
    </>
  );
};

export default CostomInput;

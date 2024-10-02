"use client";
import { Layout, Table } from "antd";
import React from "react";

const ExpertComments = ({ scoreColumns, scoreForExpert, onChange }: any) => {
  const { Content } = Layout;
  return (
    <Content
      style={{ padding: "0 24px", minHeight: 280 }}
      className="xs:mb-[100px]"
    >
      <div className="tabs-img-back" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-lg-12">
            <Table
              columns={scoreColumns}
              dataSource={scoreForExpert}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </Content>
  );
};

export default ExpertComments;

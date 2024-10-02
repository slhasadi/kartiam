"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, Input, Radio, theme } from "antd";
import axios from "axios";
import { BASE_API_URL } from "../../../../globals";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { separate, numberWithCommas } from "../../../../utils/functions";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import CostomInput from "@/app/global-components/costom-input";

type props = {
  setData: any;
  data: any;
  list: any;
  items: any;
  setHasQuestionData: any;
  hasQuestionData: any;
  clickPrev: any;
  current: any;
  setActiveButton: any;
};
const questions = ({
  items,
  setData,
  data,
  setHasQuestionData,
  hasQuestionData,
  list,
  setActiveButton,
  current,
}: props) => {
  const [questionList, setQuestionList] = useState<any>([]);
  const [value, setValue] = useState<any>(0);
  const [prevItem, setPrevItem] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [text, setText] = useState<string | string[]>("");
  const { TextArea } = Input;
  useEffect(() => {
    if (value > 0) {
      const dataObject: any = {
        answerId: value,
        answerText: text,
        questionId: items?.questionId,
      };
      setData([dataObject]);
    }
  }, [value]);
  useEffect(() => {
    if (checkedList?.length) {
      const checkData = [];
      for (let i = 0; i < checkedList.length; i++) {
        if (checkedList[i].checked) {
          const assign = {
            answerId: checkedList[i].answerId,
            answerText: checkedList[i].answerText,
            questionId: items?.questionId,
          };
          checkData.push(assign);
        }
      }
      setData(checkData);
    }
  }, [checkedList]);
  const { token } = theme.useToken();
  const contentStyle: any = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    padding: "20px",
    width: "100%",
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (items?.questionId) {
      axios
        .get(`${BASE_API_URL}GetAnswerQestion/${items?.questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setQuestionList(response.data);
          if (response.data.length > 0) {
            setHasQuestionData(true);
          }
        });
    }
  }, [items?.questionId]);

  useEffect(() => {
    if (list.length) {
      // setPrevItem(
      //   list.filter((item: any) => item.questionId == items.questionId)[0]
      //     ?.answerId
      // );
      setValue(0);
      setText("");
    }
  }, [current, list]);
  const onChange4 = (id: any | any[] = null, text: string | string[]) => {
    setActiveButton(false);
    setValue(id);
    setText(text);
  };
  const onChange = (e: any, id: number, text: CheckboxValueType[]) => {
    const checkData = {
      answerId: id,
      answerText: text,
      checked: e.target.checked,
    };
    setCheckedList((oldArray: any) => [...oldArray, checkData]);
    setActiveButton(false);
  };
  if (questionList.length > 0 && hasQuestionData) {
    return (
      <div className="xs:mb-[100px]">
        {items?.typeAnswerId == 1 && (
          <div className="q-radio">
            <Radio.Group defaultValue={prevItem}>
              {questionList.map((x: any, i: number) => {
                return (
                  <div style={contentStyle} key={i}>
                    <Radio
                      value={x.answerQuestionId}
                      checked={prevItem === x.answerQuestionId}
                      // checked={x.answerQuestionId == prevItem ? true : false}
                      onChange={() =>
                        onChange4(x.answerQuestionId, x.answerText)
                      }
                    >
                      {x.answerText}
                    </Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
        )}
        {items?.typeAnswerId == 2 && (
          <div className="q-radio">
            <Checkbox.Group>
              {questionList.map((x: any, i: number) => {
                return (
                  <div style={contentStyle} key={i}>
                    <Checkbox
                      onChange={(e) => {
                        onChange(e, x.answerQuestionId, x.answerText);
                      }}
                      value={x.answerQuestionId}
                    >
                      {" "}
                      {x.answerText}
                    </Checkbox>
                  </div>
                );
              })}
            </Checkbox.Group>
          </div>
        )}
        {items?.typeAnswerId == 3 && (
          <>
            <div style={contentStyle}>
              <CostomInput
                placeholder="مقدار مورد نظر را وارد کنید"
                onChange={(event: any) =>
                  onChange4(
                    questionList[0].answerQuestionId,
                    event.target.value
                  )
                }
                value={text}
              />
              <p>{questionList[0].answerText}</p>
            </div>
          </>
        )}
        {items?.typeAnswerId == 4 && (
          <>
            <div style={contentStyle}>
              <TextArea
                onChange={(event: any) =>
                  onChange4(
                    questionList[0].answerQuestionId,
                    event.target.value
                  )
                }
                placeholder="توضیحات مورد نظر را وارد کنید"
              />
            </div>
          </>
        )}
        {items?.typeAnswerId == 5 && (
          <>
            <div style={contentStyle}>
              <CostomInput
                placeholder="مقدار مورد نظر را وارد کنید"
                type="number"
                style={{ direction: "rtl" }}
                onChange={(event: any) =>
                  onChange4(
                    questionList[0].answerQuestionId,
                    event.target.value
                  )
                }
                value={text}
              />
              <p>{questionList[0].answerText}</p>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <img
          src={"/assets/img/loader.gif"}
          alt="loading"
          width={100}
          height={100}
        />
        پرشین استار
      </div>
    );
  }
};

export default questions;

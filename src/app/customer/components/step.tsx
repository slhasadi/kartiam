"use client";
import React, { useEffect, useState } from "react";
import Questions from "./questions";
import { Steps } from "antd";
type props = {
  items: any;
  setAnswersData: any;
  current: any;
  clickPrev: any;
  setClickPrev: any;
  hasQuestionData: any;
  setHasQuestionData: any;
  endClicked: any;
  setActiveButton: any;
};
const { Step } = Steps;
const StepComponent = ({
  items,
  setAnswersData,
  current,
  clickPrev,
  setClickPrev,
  hasQuestionData,
  setHasQuestionData,
  setActiveButton,
  endClicked,
}: props) => {
  const [data, setData] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  const numToText = (i: number) => {
    switch (i) {
      case 1:
        return "اول";
        break;
      case 2:
        return "دوم";
        break;
      case 3:
        return "سوم";
        break;
      case 4:
        return "چهارم";
        break;
      case 5:
        return "پنجم";
        break;
      case 6:
        return "ششم";
        break;
      case 7:
        return "هفتم";
        break;
      case 8:
        return "هشتم";
        break;
      case 9:
        return "نهم";
        break;
      case 10:
        return "دهم";
        break;
      case 11:
        return "یازدهم";
        break;
      case 12:
        return "دوازدهم";
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    console.log(items);
  }, []);
  useEffect(() => {
    if (endClicked) {
      setAnswersData(list);
    }
  }, [list]);
  useEffect(() => {
    if (data.length > 0) {
      if (clickPrev) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          setList((prevSquares: any) => [...prevSquares, element]);
        }
      }

      if (list.length && clickPrev) {
        const newList = [...list];
        for (let i = 0; i < list.length; i++) {
          if (list[i].questionId == data.questionId) {
            newList[i] = data;
            setList(newList);
          } else {
            setClickPrev(true);
          }
        }
      }
    }
  }, [current]);
  // useEffect(() => {
  //   if (Object.keys(data)?.length > 0) {
  //     if (clickPrev) {
  //       setList((prevSquares: any) => [...prevSquares, data]);
  //     }
  //     if (list.length && clickPrev) {
  //       const newList = [...list];
  //       for (let i = 0; i < list.length; i++) {
  //         if (list[i].questionId == data.questionId) {
  //           newList[i] = data;
  //           setList(newList);
  //         } else {
  //           setClickPrev(true);
  //         }
  //       }
  //     }
  //   }
  // }, [current, endClicked]);

  const topSteps: any = items?.map((item: any, i: number) => ({
    key: item.questionId,
    title: "سوال" + " " + numToText(Number(i + 1)),
  }));
  if (items?.length > 0) {
    return endClicked ? (
      <></>
    ) : (
      <div className="flex flex-col">
        <Steps
          progressDot
          current={current}
          className="mb-5"
          status="wait"
          type="inline"
          responsive={true}
          style={{ direction: "rtl" }}
        >
          {items.map((item: any, index: number) => {
            return <Step key={index} title={index + 1} description="" />;
          })}
        </Steps>
        <div className="parent_of_questionn">
          <>
            <h3 className="text-[25px] text-right">
              {" "}
              {items[current]?.questionText}
            </h3>
            <Questions
              items={items[current]}
              data={data}
              list={list}
              setData={setData}
              setHasQuestionData={setHasQuestionData}
              hasQuestionData={hasQuestionData}
              clickPrev={clickPrev}
              current={current}
              setActiveButton={setActiveButton}
            />
          </>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default StepComponent;

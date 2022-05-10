import React, { useState } from "react";
import QuestionOne from "../QuestionOne";
import QuestionTwo from "../QuestionTwo";
import QuestionThree from "../QuestionThree";
import QuestionFour from "../QuestionFour";
import cn from "classnames";
import styles from "./index.module.scss";

const data = [
  { title: "题一", id: 0 },
  { title: "题二", id: 1 },
  { title: "题三", id: 2 },
  { title: "题四", id: 3 },
];

function Asider() {
  const [current, setCurrent] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.btnWrap}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(styles.item, {
                [styles.active]: item.id === current,
              })}
              onClick={() => setCurrent(item.id)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div className={styles.contentWrap}>
        {current === 0 && <QuestionOne />}
        {current === 1 && <QuestionTwo />}
        {current === 2 && <QuestionThree />}
        {current === 3 && <QuestionFour />}
      </div>
    </div>
  );
}

export default Asider;

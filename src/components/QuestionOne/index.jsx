import React from "react";
import styles from "./main.module.scss";

function QuestionOne() {
  return (
    <div className={styles.containerWrap}>
      <div className={styles.container}>
        <div className={styles.title}>
          我是一个标题我是一个标题我是一个标题我是一个标题
        </div>
        <div className={styles.imgWrap}></div>
        <div className={styles.button}>按钮</div>
      </div>
    </div>
  );
}

export default QuestionOne;

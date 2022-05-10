import React, { useState } from "react";
import ReactDOM from "react-dom";

import styles from "./index.module.scss";

const Modal = ({ title, isOpen, onOk, onCancel, children }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={styles.modalContainer} onClick={onCancel}>
      <div className={styles.contentWrap}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.content}>{children}</div>
        <div className={styles.btnWrap}>
          <div className={styles.cancel} onClick={onCancel}>
            取消
          </div>
          <div className={styles.confirm} onClick={onOk}>
            确认
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const QuestionThree = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(true)}>打开对话框</button>
      <Modal
        title="标题"
        isOpen={isOpen}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <h1>这是一个对话框</h1>
      </Modal>
    </div>
  );
};
export default QuestionThree;

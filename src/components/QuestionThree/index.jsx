import React from "react";
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
          <div className={styles.confirm} onClick={onOk}>
            确认
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const HOCModal = (Component) => {
  return ({
    onOk = () => {},
    onCancel = () => {},
    // maskClosable = false,
    content = "",
    destroy,
    ...props
  }) => {
    const onOk_1 = () => {
      onOk();
      destroy();
    };

    return (
      <Component
        // maskClosable={maskClosable}
        onOk={onOk_1}
        children={content}
        {...props}
      />
    );
  };
};

["success", "error"].forEach((item) => {
  Modal[item] = ({ ...props }) => {
    let div = document.createElement("div");
    let currentConfig = Object.assign({}, props);
    document.body.appendChild(div);
    const FunModal = HOCModal(Modal);
    const destroy = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    };
    const render = (config) => {
      ReactDOM.render(
        <FunModal destroy={destroy} name={item} {...config} />,
        div
      );
    };
    const update = (newConfig) => {
      currentConfig = Object.assign({}, currentConfig, newConfig);
      render(currentConfig);
    };
    render(currentConfig);
    return {
      destroy: destroy,
      update: update,
    };
  };
});

const QuestionThree = () => {
  const handleOk = () => {
    console.log("确认");
  };
  const openModal = () => {
    return Modal.success({
      title: "标题",
      content: "内容内容",
      onOk: handleOk,
      isOpen: true,
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={openModal}>打开对话框</button>
    </div>
  );
};
export default QuestionThree;

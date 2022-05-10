import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.scss";

const Modal = ({ title, onOk, okText, onCancel, cancelText, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalContainer} onClick={onCancel}>
      <div className={styles.contentWrap}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.content}>{children}</div>
        <div className={styles.btnWrap}>
          <div
            className={styles.confirm}
            onClick={(okText && onOk) || (cancelText && onCancel)}
          >
            {okText || cancelText}
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
    content = "",
    destroy,
    ...props
  }) => {
    const handleOk = () => {
      onOk();
      destroy();
    };
    const handleCancel = () => {
      onCancel();
      destroy();
    };

    return (
      <Component
        onOk={handleOk}
        onCancel={handleCancel}
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

const QuestionFour = () => {
  const handleOk = () => {
    console.log("确认");
  };
  const success = () => {
    return Modal.success({
      title: "标题",
      content: "success",
      onOk: handleOk,
      okText: "确认",
    });
  };
  const error = () => {
    return Modal.error({
      title: "标题",
      content: "error",
      cancelText: "取消",
      onOk: handleOk,
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.item} onClick={success}>
        success
      </button>
      <button className={styles.item} onClick={error}>
        error
      </button>
    </div>
  );
};
export default QuestionFour;

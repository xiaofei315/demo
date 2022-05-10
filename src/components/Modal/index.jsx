import React from "react";
import ReactDOM from "react-dom";

import styles from "./index.module.scss";

const Modal = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body
  );
};

export default Modal;

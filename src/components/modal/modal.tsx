import React from 'react';
import { FC, PropsWithChildren, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

type TModalProps = {
  onClose: () => void;
  title: string;
};

const Modal: FC<PropsWithChildren<TModalProps>> = ({ children, onClose, title }) => {
    
  useEffect(() => {
    const closeWhenPressEscape = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    document.addEventListener("keydown", closeWhenPressEscape);
    return () => {
      document.removeEventListener("keydown", closeWhenPressEscape);
    };
  }, [onClose]);

  return (
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.container}>
        {children}
        <div className={`${styles.title}`}>
          <p className={`text text_type_main-large`}>{title}</p>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
      </div>
    </>
  );
};

export default Modal;

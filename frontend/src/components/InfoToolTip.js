import React from "react";
import iconSuccess from "../images/icon-success.jpg";
import iconFailure from "../images/icon-failure.jpg";

function InfoToolTip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_info">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon"
          src={isSuccess ? iconSuccess : iconFailure}
          alt="Иконка"
        />
        <h3 className="popup__title">
          {isSuccess
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h3>
      </div>
    </div>
  );
}

export default InfoToolTip;

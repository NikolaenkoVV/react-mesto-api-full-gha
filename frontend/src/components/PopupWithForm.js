import React from "react";

function PopupWithForm({ name, title, isOpen, children, onClose, submitButtonText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className={`popup__title`}>{title}</h2>
        <form onSubmit={onSubmit} name={`${name}`} className={`form form_type_${name}`} noValidate>
          {children}
          <button type="submit" className="form__submit-button">
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

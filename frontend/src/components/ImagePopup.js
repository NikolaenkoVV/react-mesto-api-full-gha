import React from "react";

function ImagePopup({ place, onClose }) {
  return (
    <div
      className={`popup popup_type_place-image ${place ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          src={place?.link}
          alt={place?.name}
          className="popup__enlarged-image"
        />
        <p className="popup__description">{place?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;

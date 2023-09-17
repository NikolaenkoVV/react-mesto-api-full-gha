import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  
  const [placeName, setPlaceName] = React.useState();
  const [placeLink, setPlaceLink] = React.useState();
  
  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  const handlePlaceNameChange = (e) => {
    setPlaceName(e.target.value);
  };

  const handlePlaceLinkChange = (e) => {
    setPlaceLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({
      name: placeName,
      link: placeLink,
    });
  };

  return (
    <PopupWithForm
      name={`add-place`}
      title={`Новое место`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={`Создать`}
    >
      <input
        value={placeName || ""}
        onChange={handlePlaceNameChange}
        type="text"
        placeholder="Название места"
        name="name"
        id="place"
        minLength="2"
        maxLength="30"
        className="form__input form__input_type_add-place"
        required
      />
      <span id="place-error" className="form__input-error"></span>
      <input
        value={placeLink || ""}
        onChange={handlePlaceLinkChange}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        id="place-url"
        className="form__input form__input_type_add-url"
        required
      />
      <span id="place-url-error" className="form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

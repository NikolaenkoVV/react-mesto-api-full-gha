import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState(" ");
  const [description, setDescription] = React.useState(" ");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  
  return (
    <PopupWithForm
      name={`edit-profile`}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={`Сохранить`}
    >
      <input
        type="text"
        name="name"
        value={name || " "}
        onChange={handleNameChange}
        id="profile-name"
        className="form__input form__input_type_edit-name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
      />
      <span id="profile-name-error" className="form__input-error"></span>
      <input
        type="text"
        name="description"
        value={description || ""}
        onChange={handleDescriptionChange}
        id="profile-description"
        className="form__input form__input_type_edit-description"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
      />
      <span id="profile-description-error" className="form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

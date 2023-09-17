import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  
  const avatarRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={`edit-avatar`}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={`Сохранить`}
    >
      <input
        ref={avatarRef}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        id="avatar-url"
        minLength="2"
        maxLength="100"
        className="form__input form__input_type_edit-avatar"
        required
      />
      <span id="avatar-url-error" className="form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

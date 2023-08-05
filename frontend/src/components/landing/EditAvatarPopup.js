import PopupWithForm from "./PopupWithForm";
import React, { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loadingText }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="popup-edit-avatar"
      title="Обновить аватар"
      children={
        <>
          <input
            ref={avatarRef}
            name="avatar"
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_card-link"
            required
          />
          <span className="popup__input-text-error popup__input-text-error_type_avatar" />
          <button
            // disabled - использовать при разработки Валидатора
            id="button-submit-popup-avatar"
            type="submit"
            className="popup__submit"
            //className="popup__submit popup__submit_inactive" - использовать при разработки Валидатора
          >
            {loadingText || "Сохранить"}
          </button>
        </>
      }
    />
  );
}

export default EditAvatarPopup;

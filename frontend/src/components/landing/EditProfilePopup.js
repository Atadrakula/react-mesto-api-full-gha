import PopupWithForm from "./PopupWithForm.js";
import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loadingText }) {
  const [valueName, setValueName] = useState('');
  const [valueActivity, setValueActivity] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const { name, about } = currentUser || {};

  useEffect(() => {
    if(isOpen) {
      setValueName(name);
      setValueActivity(about);
    }
  }, [name, about, isOpen]);

  function handleChangeName(e) {
    setValueName(e.target.value);
  }

  function handleChangeActivity(e) {
    setValueActivity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      username: valueName,
      useractivity: valueActivity,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="popup-edit"
      title="Редактировать профиль"
      children={
        <>
          <input
            name="username"
            type="text"
            placeholder="Имя"
            className="popup__input popup__input_type_username"
            minLength="2"
            maxLength="40"
            value={valueName || ''}
            onChange={handleChangeName}
            required
          />
          <span className="popup__input-text-error popup__input-text-error_type_username" />
          <input
            name="useractivity"
            type="text"
            placeholder="О себе"
            className="popup__input popup__input_type_useractivity"
            minLength="2"
            maxLength="200"
            value={valueActivity || ''}
            onChange={handleChangeActivity}
            required
          />
          <span className="popup__input-text-error popup__input-text-error_type_useractivity" />
          <button
            id="button-submit-popup-edit"
            type="submit"
            className="popup__submit"
          >
            {loadingText || 'Сохранить'}
          </button>
        </>
      }
    />
  )
}


export default EditProfilePopup;


import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";


function AddPlacePopup({ isOpen, onClose, onAddPlace, loadingText }) {
  const [valueNameCard, setValueNameCard] = useState('');
  const [valueLink, setValueLink] = useState('');

  useEffect(() => {
    if(isOpen) {
      setValueNameCard('');
      setValueLink('');
    }
  }, [isOpen])

  function handleChangeNameCard(e) {
    setValueNameCard(e.target.value);
  }

  function handleChangeLink(e) {
    setValueLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: valueNameCard,
      link: valueLink,
    })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="popup-add"
      title="Новое место"
      children={
        <>
          <input
            name="name"
            type="text"
            placeholder="Название"
            className="popup__input popup__input_type_card-name"
            minLength="2"
            maxLength="30"
            value={valueNameCard}
            onChange={handleChangeNameCard}
            required
          />
          <span className="popup__input-text-error popup__input-text-error_type_name"></span>
          <input
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_card-link"
            value={valueLink}
            onChange={handleChangeLink}
            required
          />
          <span className="popup__input-text-error popup__input-text-error_type_link" />
          <button
            // disabled - использовать при разработки Валидатора
            id="button-submit-popup-add"
            type="submit"
            className="popup__submit"
            // className="popup__submit popup__submit_inactive" - использовать при разработки Валидатора
          >
            {loadingText || 'Создать'}
          </button>
        </>
      }
    />
  )
}

export default AddPlacePopup;

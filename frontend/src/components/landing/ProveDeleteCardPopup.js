import React from "react";
import PopupWithForm from "./PopupWithForm";

// - доделаю позже, реализация подтверждения

function ProveDeleteCardPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="popup-delete"
      title="Вы уверены?"
      children={
        <>
          <button type="button" className="popup__submit">
            Да
          </button>
        </>
      }
    />
  )

}

export default ProveDeleteCardPopup;


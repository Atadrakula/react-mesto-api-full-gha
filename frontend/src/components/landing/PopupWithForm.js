function PopupWithForm({isOpen, onClose, name, title, children, onSubmit}) {
  const popupVisibleClass = `popup ${isOpen ? 'popup_visible' : '' }`;

	return (
    <div className={popupVisibleClass} id={name} onClick={onClose}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className={`popup__close popup__close_type_${name} button-clickable cursor-pointer`}
          type="button"
					onClick={onClose}
        />
        <h2 className="popup__name">{title}</h2>
        <form
          name={`${name}-form`}
          action="#"
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

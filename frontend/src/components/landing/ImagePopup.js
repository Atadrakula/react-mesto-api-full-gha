function ImagePopup({ card, onClose }) {
  const visibleClass = `popup image-popup ${card ? "popup_visible" : ""}`;

  return (
    <div className={visibleClass}>
      <div className="image-popup__container">
        <button
          aria-label="Закрыть"
          className="popup__close image-popup__close button-clickable cursor-pointer"
          type="button"
          onClick={onClose}
        />
        {card?.link && (
          <>
            <img src={card.link} alt={card.name} className="image-popup__img" />
            <h3 className="image-popup__title">{card.name}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;

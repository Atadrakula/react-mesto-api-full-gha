function InfoToolTip ({img, title, isOpen, onClose}) {
  const InfoToolVisibleClass = `infotooltip ${isOpen ? 'infotooltip_visible' : '' }`;

  return (
    <div className={InfoToolVisibleClass} onClick={onClose}>
      <div className="infotooltip__container">
        <button
          aria-label="Закрыть"
          className="infotooltip__close button-clickable cursor-pointer"
          type="button"
          onClick={onClose}
        />
        <img src={img} alt="Ok" className="infotooltip__img" />
        <h2 className="infotooltip__title">{title}</h2>
      </div>
    </div>
  )
}

export default InfoToolTip;

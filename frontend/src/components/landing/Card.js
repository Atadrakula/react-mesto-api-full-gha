import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikedClassName = (`cards__heart cursor-pointer ${isLiked && 'cards__heart_active'}`);

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="cards">
      {isOwn && (
        <button
          className="cards__trash cursor-pointer button-clickable"
          aria-label="Мусорка"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div
        style={{ backgroundImage: `url(${card.link})` }}
        className="cards__img cursor-pointer"
        onClick={handleClick}
      />
      <div className="cards__name-form">
        <h2 className="cards__name">{card.name}</h2>
        <div className="cards__heart-box">
          <button
            className={cardLikedClassName}
            aria-label="Сердце"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="cards__heart-count">{card.likes?.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

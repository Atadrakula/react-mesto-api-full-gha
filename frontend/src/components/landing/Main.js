import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser || {};

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container cursor-pointer">
            <div
              style={{ backgroundImage: `url(${avatar})` }}
              className="profile__avatar"
            />
            <div
              className="profile__avatar-overlay"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__data">
            <h1 className="profile__name">{name}</h1>
            <button
              className="profile__button-edit button-clickable cursor-pointer"
              aria-label="Редактировать"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__activity">{about}</p>
          </div>
        </div>
        <button
          className="profile__button-add button-clickable cursor-pointer"
          aria-label="Добавить"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="places">
        <ul className="places__cards">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} key={card._id} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

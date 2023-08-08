import Footer from "./landing/Footer.js";
import Main from "./landing/Main.js";
import ImagePopup from "./landing/ImagePopup.js";
import React, { useState, useEffect, useCallback } from "react";
import api from "../utils/Api.js";
import {
  CurrentUserContext
} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./landing/EditProfilePopup.js";
import EditAvatarPopup from './landing/EditAvatarPopup.js';
import AddPlacePopup from "./landing/AddPlacePopup.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./landing/Login.js";
import Register from "./landing/Register.js";
import DoneInfoToolTip from "./landing/DoneInfoToolTip.js";
import DismissInfoToolTip from "./landing/DismissInfoToolTip.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import MainHeader from "./landing/MainHeader.js";
import SignInHeader from "./landing/SignInHeader.js";
import SignUpHeader from "./landing/SignUpHeader.js";
import authenticationApi from "../utils/Authentication.js";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Жак-Ив Куст",
    about: "Исследователь",
    avatar: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  });
  const [loadingText, setLoadingText] = useState(null);
  const [isDoneInfoToolTip, setDoneInfoToolTip] = useState(false);
  const [isDismissInfoToolTip, setDismissInfoToolTip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
        try {
            const userData = await authenticationApi.pullDataAuth();
            setEmail(userData.data.email);
            setLoggedIn(true);
            navigate('/main', {replace: true});
        } catch (error) {
            if (error.message === 'Токен недействителен или отсутствует') {
                // здесь можно добавить перенаправление на страницу входа или обновить состояние
                navigate('/sign-in', {replace: true});  // Например, перенаправляем пользователя на страницу входа
            }
            console.error(`Ошибка при загрузке данных пользователя: ${error}`);
            setLoggedIn(false);
        }
    };
    checkToken();
}, []);



useEffect(() => {
  const fetchData = async () => {
    if (!loggedIn) return;

    try {
      const [dataCards, dataUser] = await Promise.all([
        api.pullCardInfo(),
        api.pullProfileInfo(),
      ]);
      setCards(dataCards.data || []);
      setCurrentUser(dataUser.data || {});

    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  fetchData();
}, [loggedIn]);

async function handleLogin(data) {
  try {
    await authenticationApi.pushLogin(data);
    setEmail(data.email);
    setLoggedIn(true);
    navigate('/main', {replace: true});
  } catch (error) {
    console.error(`Ошибка при отправки данных регистрации пользователя: ${error}`);
    openDismissInfoToolTip();
  }
}

  async function handleRegister(data) {
    try {
      const result = await authenticationApi.pushRegistration(data);
      if (result.data) {
        openDoneInfoToolTip();
        navigate('/sign-in', {replace: true});
      }
    } catch (error) {
      openDismissInfoToolTip();
      console.error("Ошибка при отправки данных регистрации пользователя:", error);
    }
  }

  async function handleCardLike(targetCard) {
    const isLiked = targetCard.likes.some(i => i === currentUser._id);

    try {
      const checkedCard = await api.toggleLikeCard(targetCard._id, !isLiked);
      const newCards = cards.map(card => card._id === checkedCard.data._id ? checkedCard.data : card);
      setCards(newCards);

    } catch (error) {
      console.error("Ошибка при лайке/дизлайке карточки:", error);
    }
  }

  async function handleCardDelete(targetCard) {
    try {
      await api.deleteCard(targetCard._id);
      const newCards = cards.filter(card => card._id !== targetCard._id);
      setCards(newCards);
    } catch (error) {
      console.error("Ошибка при удалении карточки:", error);
    }
  }

  async function handleUpdateUser(dataUser) {
    try {
      setLoadingText('Сохранение...');
      const updateData = await api.patchProfileInfo(dataUser);
      setCurrentUser(updateData.data);
      closeAllPopups();
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
    } finally {
      setLoadingText(null);
    }
  }

  async function handleUpdateAvatar(avatarLink) {
    try {
      setLoadingText('Сохранение...');
      const updateAvatar = await api.pushAvatar(avatarLink);
      setCurrentUser(updateAvatar.data);
      closeAllPopups();
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
    } finally {
      setLoadingText(null);
    }
  }

  async function handleAddPlaceSubmit(dataCard) {
    try {
      setLoadingText('Создание...');
      const pushCardInfo = await api.pushCardInfo(dataCard);
      setCards([pushCardInfo.data, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.error(`Ошибка при загрузке данных новой карточки: ${error}`);
    } finally {
      setLoadingText(null);
    }
  }

  async function handleSignOut() {
    try {
      await authenticationApi.pushLogout();
      setLoggedIn(false);
    } catch (error) {
      console.error(`Ошибка при выходе из системы: ${error}`);
  }
}

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function openEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function openEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  function openDoneInfoToolTip() {
    setDoneInfoToolTip(true);
  }

  function openDismissInfoToolTip() {
    setDismissInfoToolTip(true);
  }

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDoneInfoToolTip(false);
    setDismissInfoToolTip(false);
    setSelectedCard(null);
  }, []);

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isSelectedCard ||
      isDoneInfoToolTip ||
      isDismissInfoToolTip
    ) {
      document.addEventListener("keydown", handleEscClose);

      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isSelectedCard,
    isDoneInfoToolTip,
    isDismissInfoToolTip,
    closeAllPopups
  ]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {loggedIn ? (
            <MainHeader onSignOut={handleSignOut} email={email} />
          ) : (
            <Routes>
              <Route path="/sign-in" element={<SignInHeader />} />
              <Route path="/sign-up" element={<SignUpHeader />} />
            </Routes>
          )}
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
            <Route path="/main" element={<ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={openEditProfilePopup}
              onAddPlace={openAddPlacePopup}
              onEditAvatar={openEditAvatarPopup}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleCardDelete}
            />} />
            <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
            <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          </Routes>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} loadingText={loadingText} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} loadingText={loadingText} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} loadingText={loadingText} />
          <ImagePopup card={isSelectedCard} onClose={closeAllPopups} />
          <DoneInfoToolTip isOpen={isDoneInfoToolTip} onClose={closeAllPopups} />
          <DismissInfoToolTip isOpen={isDismissInfoToolTip} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

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
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingText, setLoadingText] = useState(null);
  const [isDoneInfoToolTip, setDoneInfoToolTip] = useState(false);
  const [isDismissInfoToolTip, setDismissInfoToolTip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          authenticationApi.setToken(token);
          const userData = await authenticationApi.pullDataAuth();
          setEmail(userData.data.email);
          setLoggedIn(true);
          navigate('/main', {replace: true});
        } catch (error) {
          console.error(`Ошибка при загрузке данных пользователя: ${error}`);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const dataCards = await api.pullCardInfo();
        setCards(dataCards);
      } catch (error) {
        console.error(`Ошибка при загрузке данных пользователя: ${error}`);
      }
    };

    if(loggedIn) {
      getUserInfo();
    }
  }, [setCards, loggedIn]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const dataUser = await api.pullProfileInfo();
        setCurrentUser(dataUser);
      } catch (error) {
        console.error(`Ошибка при загрузке данных пользователя: ${error}`);
      }

    }

    if(loggedIn) {
      fetchUserInfo();
    }

  }, [loggedIn]);

  async function handleLogin(data) {
    try {
      const result = await authenticationApi.pushLogin(data);
      if (result.token) {
        authenticationApi.setToken(result.token);
        setEmail(data.email);
        setLoggedIn(true);
        navigate('/main', {replace: true});
      }
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

    const isLiked = targetCard.likes.some(i => i._id === currentUser._id);

    try {
      const checkedCard = await api.toggleLikeCard(targetCard._id, !isLiked);
      const newCards = cards.map(card => card._id === checkedCard._id ? checkedCard : card);
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
      setCurrentUser(updateData);
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
      setCurrentUser(updateAvatar);
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
      setCards([pushCardInfo, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.error(`Ошибка при загрузке данных новой карточки: ${error}`);
    } finally {
      setLoadingText(null);
    }
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
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
              setCards={setCards}
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

import logo from ".././images/logo.svg";
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { ConfirmationPopup } from "./ConfirmationPopup";
import { ProtectedRouteElement } from "./ProtectedRoute.js";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoTooltip } from "./InfoTooltip";
import * as auth from "./Auth";
//

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setisConfirmationPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    avatar: "",
    name: "",
    about: "",
    cohort: "",
  });
  // авторизация и регистрация пользователя
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const [userEmail, setUserEmail] = React.useState("");
  const [isInfoTooltip, setIsInfoTooltip] = React.useState("");

  function handleRegister(data) {
    auth
      .register(data)
      .then((data) => {
        if (data.typeof !== "undefined") {
        setIsInfoTooltip(true);
        openInfoTooltip();
        navigate("/sign-in", { replace: true });
        }  
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(false);
        openInfoTooltip();
      });
  }

  function handleLogin(data) {
    auth
      .authorize(data.password, data.email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsInfoTooltip(false);
        openInfoTooltip();
        console.log(err);
      });

    setIsLoggedIn(true);
    setUserEmail(data.email);
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in");
  }

  function tokenCheck() {
    // проверка если у пользователя есть токен в localStorage
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then(({ data }) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisConfirmationPopupOpen(false);
    setSelectedCard({});
    setDeletedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleTrashClick(card) {
    setDeletedCard(card);
    setisConfirmationPopupOpen(true);
  }
  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleUpdateAvatar(data) {
    api
      .patchUserAvatar(data.avatar)
      .then(setIsLoading(true))
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
  function handleUpdateUser(data) {
    api
      .patchUserInfo(data)
      .then(setIsLoading(true))
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then(setIsLoading(true))
      .then((newCard) => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(setIsLoading(true))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <React.Fragment>
        <Header
          loggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogOut={handleLogOut}
          src={logo}
          alt="Логотип Место"
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onConfirmationDelete={handleTrashClick}
              />
            }
          ></Route>
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} onLogin={userEmail} />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmationPopup
          card={deletedCard}
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
          onDelete={handleCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isConfirmationStatus={isInfoTooltip}
        />
      </React.Fragment>
    </CurrentUserContext.Provider>
  );
}

export default App;

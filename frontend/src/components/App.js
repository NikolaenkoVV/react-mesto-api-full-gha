import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [places, setPlaces] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [emailNote, setEmailNote] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailNote(res.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(isLoggedIn) {
    api
      .getServerUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getServerInitialCards(jwt)
      .then((places) => {
        setPlaces([...places]);
      })
      .catch((err) => {
        console.log(err);
      });
  }}, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (place) => {
    setSelectedCard(place);
  };

  const handleCardLike = (place) => {
    const isLiked = place.likes.some((i) => i === currentUser._id);
    const jwt = localStorage.getItem("jwt");
    api
      .changePlaceLikeStatus(place, isLiked, jwt)
      .then((newPlace) => {
        setPlaces((state) =>
          state.map((c) => (c._id === place._id ? newPlace : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (place) => {
    const jwt = localStorage.getItem("jwt");
    api
      .deleteCard(place, jwt)
      .then(() =>
        setPlaces((state) => state.filter((c) => c._id !== place._id))
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (data) => {
    const jwt = localStorage.getItem("jwt");
    api
      .setServerUserInfo(data, jwt)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    const jwt = localStorage.getItem("jwt");
    api
      .setServerUserAvatar(data, jwt)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    const jwt = localStorage.getItem("jwt");
    api
      .addNewPlace(data, jwt)
      .then((newPlace) => {
        setPlaces([newPlace, ...places]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoToolTipPopupOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoToolTipPopupOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailNote(email);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmailNote("");
    navigate("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <Header />
                <Login onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header />
                <Register onRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header emailNote={emailNote} onSignOut={handleSignOut} />
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  places={places}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
          <Route path="*" element={<Navigate to="/sign-in"/>}/>
        </Routes>
        <ImagePopup place={selectedCard} onClose={closeAllPopups}></ImagePopup>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

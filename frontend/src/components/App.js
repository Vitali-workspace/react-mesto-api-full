import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup'
import InfoTooltip from './InfoTooltip'
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth'


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState({ open: false, status: '' });

  const [isIdCardRemove, setIdCardRemove] = React.useState({});
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, item: {} });
  const [isCurrentUser, setCurrentUser] = React.useState({});

  const [isAuthorized, setAuthorized] = React.useState(false);
  const [isEmail, setEmail] = React.useState('');
  const history = useHistory();


  React.useEffect(() => {
    if (isAuthorized) {

      api.getProfileInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        }).catch(err => console.log(err))

      api.getInitialCards()
        .then((cardsInfo) => {
          setCards(cardsInfo)
        }).catch(err => console.log(err))
    }
  }, [isAuthorized]);

  // проверка наличия токена для фоновой авторизации
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.validationToken(token)
        .then(res => {
          handleAuthorized();
          setEmail(res.data.email);
          history.push('/');
        })
    }
  }, [history]);


  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setInfoTooltipPopupOpen({ open: false, status: '' });
    setSelectedCard({ isOpen: false, item: {} });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // функция для передачи информации о карточке по которой кликнули
  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, item: card });
  }

  // функция открытия попапа для удаления карточки
  function handleDeleteClick() {
    setConfirmDeletePopupOpen(true)
  }

  // функция сохраняющая id карточки для её удаления
  function сardRemoveId(card) {
    setIdCardRemove(card)
  }

  function handleAuthorized() {
    setAuthorized(true);
  }

  function handleUpdateUser(userInfo) {
    api.changeProfileInfo(userInfo)
      .then((profileInfo) => {
        setCurrentUser(profileInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatarUrl) {
    api.addAvatarServer(avatarUrl)
      .then((avatarInfo) => {
        setCurrentUser(avatarInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(usersCard => usersCard._id === isCurrentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // получение массива с изменёнными лайками.
        const newCards = cards.map((elementCard) => elementCard._id === card._id ? newCard : elementCard);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCardServer(newCard)
      .then((newCardInfo) => {
        setCards([newCardInfo, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCardServer(card)
      .then(() => {
        const newListCards = cards.filter((elementCard) => elementCard._id === card ? false : true)
        setCards(newListCards);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleRegistration(password, email) {
    auth.register(password, email)
      .then(res => {
        if (res.data) {
          setInfoTooltipPopupOpen({ open: true, status: 'success' });
          history.push('/sign-in');
        }
      })
      .catch(err => {
        setInfoTooltipPopupOpen({ open: true, status: 'fail' });
        console.log(`ошибка в регистрации: ${err}`);
      })
  }


  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setEmail(email);
          handleAuthorized();
          history.push('/');
        }
      })
      .catch(err => {
        setInfoTooltipPopupOpen({ open: true, status: 'fail' });
        console.log(`ошибка в авторизации: ${err}`)
      })
  }

  function loginOut() {
    localStorage.removeItem('jwt');
    setAuthorized(false);
    setEmail('');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={isCurrentUser}>
      <div className="root">
        <div className="root__content">
          <Header
            onSignOut={loginOut}
            userEmail={isEmail} />

          <Switch>

            <ProtectedRoute
              exact path='/'
              statusAuth={isAuthorized}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              stateCards={cards}
              onCardLike={handleCardLike}
              onCardDelete={сardRemoveId}
              onConfirmPopup={handleDeleteClick}
            />

            <Route path='/sign-up'>
              <Register onRegister={handleRegistration} />
            </Route>

            <Route path='/sign-in'>
              <Login onLogin={handleLogin} />
            </Route>

            <Route>
              {isAuthorized ? (<Redirect to='/' />) : (<Redirect to='/sign-in' />)}
            </Route>

          </Switch>

          {isAuthorized && <Footer />}

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          {/* Edit */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* Add */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/* Avatar */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* Delete */}
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            cardId={isIdCardRemove}
          />

          {/* Оповещение о успешной регистрации и ошибках*/}
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />

        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from 'react';
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import {api} from "../utils/Api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from "./DeletePlacePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] = React.useState({isOpen: false, card: {}});

  const [renderSaving, setRenderSaving] = React.useState(false);

    //ЭФФЕКТЫ

    //при загрузке страницы получаем данные карточек
    React.useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    //при загрузке страницы получаем данные пользователя
    React.useEffect(() => {
        api.getUserInfoApi()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    //ОБРАБОТЧИКИ
  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard({...selectedCard, isOpen: true, element: card});
  }

  function handleDeletePlaceClick(card) {
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: true, card: card});
  }

    //добавление новой карточки
    function handleAddPlaceSubmit(cardData) {
        setRenderSaving(true);
        api.addNewCard(cardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setRenderSaving(false);
            });
    }

    //изменение данных пользователя
    function handleUpdateUser(newUserData) {
        setRenderSaving(true);
        api.setUserInfo(newUserData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setRenderSaving(false);
            });
    }

    //изменение аватара пользователя
    function handleUpdateAvatar(newAvatarLink) {
        setRenderSaving(true);
        api.setUserAvatar(newAvatarLink)
            .then((data) => {
                setCurrentUser({...currentUser, avatar: data.avatar});
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setRenderSaving(false);
            });
    }

    //поставить/снять лайка
    function handelCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err);
        });
  }

    //удаление карточки
  function handleCardDelete(card) {
      setRenderSaving(true);
      api.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
          closeAllPopups();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
            setRenderSaving(false);
        });
  }


  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({...selectedCard, isOpen: false});
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: false});
  }

  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopups();
  }

    //РАЗМЕТКА JSX
  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <>
            <Header/>
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handelCardLike}
                cards={cards}
                onDeletePlace={handleDeletePlaceClick}
            />
            <Footer/>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isRender={renderSaving}>
            </EditProfilePopup>

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isRender={renderSaving}
                onOverlayClose={handleOverlayClickClose}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isRender={renderSaving}
                onOverlayClose={handleOverlayClickClose}
            />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                onOverlayClose={handleOverlayClickClose}
            />

            <DeletePlacePopup
                deleteCard={selectedCardDeleteConfirm}
                onClose={closeAllPopups}
                onOverlayClose={handleOverlayClickClose}
                onDeleteCard={handleCardDelete}
                isRender={renderSaving}
            />
          </>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React from 'react';
import ImagePopup from "./ImagePopup.js";
function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});

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

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({...selectedCard, isOpen: false});
  }

  return (
      <div className="page">
      <>
        <Header/>
        <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
        />
        <Footer/>

        <PopupWithForm name="profile" title="Редактировать профиль" btnName="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input id="name-field" className="popup__item popup__item_type_name popup__item_type_name-profile" placeholder="Имя" name="name" type="text" maxLength={40} minLength={2} required=""/>
          <span className="popup__error" id="name-field-error" />
          <input id="info-field" className="popup__item popup__item_type_info popup__item_type_info-profile" placeholder="О себе" name="info" type="text" maxLength={200} minLength={2} required=""/>
          <span className="popup__error popup__error_submit" id="info-field-error"/>
        </PopupWithForm>

        <PopupWithForm name="card" title="Новое место" btnName='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id="field-card" name="name" className="popup__item popup__item_type_name popup__item_type_name-card" placeholder="Название" maxLength={30} minLength={1} required=""/>
          <span className="popup__error" id="field-card-error" />
          <input id="field-link" name="link" type="url" className="popup__item popup__item_type_info popup__item_type_info-link" placeholder="Ссылка на картинку" required=""/>
          <span className="popup__error popup__error_submit" id="field-link-error"/>
        </PopupWithForm>

        <PopupWithForm name="avatar" title="Обновить аватар" btnName='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
            <input id="input-avatar" type="url" name="avatar" className="popup__item  popup__item_type_link" placeholder="Ссылка на аватар" required=""/>
            <span className="popup__error popup__error_submit" id="input-avatar-error" />
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <div className="popup popup_type_delete">
          <div className="popup__container popup__container_type_delete">
            <h3 className="popup__heading popup__heading_type_delete">Вы уверенны?</h3>
            <button className="popup__btn popup__btn_type_delete popup__btn_action_submit popup__btn_action_submit-yes" type="submit">
              Да
            </button>
            <button aria-label="Close" className="popup__btn popup__btn_action_close" type="button"/>
          </div>
        </div>
      </>
      </div>
  );
}

export default App;

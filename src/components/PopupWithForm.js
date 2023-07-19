import React from 'react';

//Компонент попапов
function PopupWithForm({ name, title, btnName, isOpen, onClose, children, onSubmit, onOverlayClose }) {

    return (
        <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : false}`} onClick={onOverlayClose}>
            <div className={`popup__container popup__container_type_${name}`}>
                <h3 className={`popup__heading popup__heading_type_${name}`}>{title}</h3>
                <form className="popup__form" name={`popup-form-${name}`} noValidate onSubmit={onSubmit}>
                    <>{children}</>
                    <button className={`popup__btn popup__btn_type_${name} popup__btn_action_submit`} type="submit">{btnName}</button>
                </form>
                <button onClick={onClose} className=" popup__btn popup__btn_action_close" type="button" aria-label="Закрыть окно"></button>
            </div>
        </section>
    )
}

export default PopupWithForm;
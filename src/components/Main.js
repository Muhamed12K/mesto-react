import React from 'react';
import {api} from "../utils/Api";
import Card from './Card.js'

function Main(props) {
    const [userDescription, setUserDescription ] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCard] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfoApi()
            .then(data => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCard(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return(
        <main>
            <section className="profile">
                <div className="profile__avatar" onClick={props.onEditAvatar}>
                    <img className="profile__image" src={userAvatar} alt="фото профиля" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" className="profile__btn profile__btn_action_edit" onClick={props.onEditProfile} />
                    </div>
                    <p className="profile__work">{userDescription}</p>
                </div>
                <button type="button" className="profile__btn profile__btn_action_add" onClick={props.onAddPlace} />
            </section>
            <section className="photo-grid">
                <template className="card-template" />
                <ul className="photo-grid__list" />
            </section>

            <section className="photo-grid " aria-label="Фотографии">
                <ul className="photo-grid__list">
                    {cards.map((item) => (
                        <Card key={item['_id']} card={item} onCardClick={props.onCardClick}/>)
                    )}
                </ul>
            </section>
        </main>
    )

}

export default Main;
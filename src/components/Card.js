function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card-template">
      <li className="card">
        <img  className="card__image" src={props.card.link} alt={`Фото ${props.card.name}`} onClick={handleClick}/>
        <button className="card__btn card__btn_action_del" type="button" aria-label="Удалить карточку"></button>
        <div className="card__description">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-group">
            <button className="card__btn card__btn_action_like" type="button" aria-label="Лайкнуть"></button>
            <p className="card__like-span">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </article>
  )
}

export default Card;
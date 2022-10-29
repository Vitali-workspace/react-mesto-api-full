
import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page">
      <section className="profile">
        <div className="profile__section-avatar">
          <button className="profile__edit-icon" onClick={props.onEditAvatar} />
          <img className="profile__photo" src={currentUser.avatar} alt="фото профиля" />
        </div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__description">{currentUser.about}</p>
        <button className="profile__btn-edit" type="button" onClick={props.onEditProfile} />
        <button className="profile__btn-add" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="gallery" aria-label="галерея">
        {
          props.stateCards.map((elementCard) => (
            <Card
              key={elementCard._id}
              card={elementCard}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onConfirmPopup={props.onConfirmPopup}
            />)
          )}
      </section>
    </main>
  )
}

export default Main;
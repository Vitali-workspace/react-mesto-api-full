import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [isNameCard, setNameCard] = React.useState('');
  const [isLinkCard, setLinkCard] = React.useState('');

  function handleNameCard(evt) {
    setNameCard(evt.target.value);
  }

  function handleLinkCard(evt) {
    setLinkCard(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ name: isNameCard, link: isLinkCard })
  }

  React.useEffect(() => {
    setNameCard('');
    setLinkCard('');
  }, [props.onClose]);

  return (
    <PopupWithForm
      title='Новое место'
      name='formAdd'
      btnName='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={isNameCard}
        onChange={handleNameCard}
        className="popup__edit-input"
        id="inputAddName"
        name="formName"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        //pattern=".{2,30}"
        required />
      <span id="inputAddName-error" className="popup__input-error">Вы пропустили это поле.</span>

      <input
        value={isLinkCard}
        onChange={handleLinkCard}
        className="popup__edit-input"
        id="inputAddLink"
        name="formText"
        type="url"
        pattern="(www|http:|https:)+[^\s]+[\w]"
        placeholder="Ссылка на картинку"
        required />
      <span id="inputAddLink-error" className="popup__input-error">Введите адрес сайта.</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
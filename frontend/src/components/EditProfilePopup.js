import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [isName, setName] = React.useState('Жак-Ив Кусто');
  const [isDescription, setDescription] = React.useState('Исследователь океана');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function changeNameUser(evt) {
    setName(evt.target.value)
  }

  function changeDescriptionUser(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name: isName, about: isDescription });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='formEdit'
      btnName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={isName || ''}
        onChange={changeNameUser}
        className="popup__edit-input"
        id="inputEditName"
        name="formName"
        type="text"
        placeholder="Имя"
        //pattern=".{2,40}"
        minLength="2"
        maxLength="40"
        required />
      <span id="inputEditName-error" className="popup__input-error">Вы пропустили это поле.</span>

      <input
        onChange={changeDescriptionUser}
        value={isDescription || ''}
        className="popup__edit-input"
        id="inputEditText"
        name="formText"
        type="text"
        placeholder="О себе"
        //pattern=".{2,200}"
        minLength="2"
        maxLength="200"
        required />
      <span id="inputEditText-error" className="popup__input-error">Вы пропустили это поле.</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
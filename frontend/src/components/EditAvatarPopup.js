import React from "react";
import PopupWithForm from "./PopupWithForm";
//import alternativeAvatar from '../images/image-prof.png';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef('');
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='formAddAvatar'
      btnName='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="popup__edit-input"
        id="inputAddLinkAvatar"
        name="formText"
        pattern="(www|http:|https:)+[^\s]+[\w]"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="inputAddLinkAvatar-error" className="popup__input-error">Введите адрес.</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
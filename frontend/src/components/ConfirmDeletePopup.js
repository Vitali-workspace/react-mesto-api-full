import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(props.cardId);
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='formDeleteCard'
      btnName='Да'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmDeletePopup;

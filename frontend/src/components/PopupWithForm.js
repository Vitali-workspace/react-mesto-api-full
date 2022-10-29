function PopupWithForm(props) {
  const btnAvatarPosition = (props.name === 'formAddAvatar') ? 'popup__btn-close_type_position-avatar' : '';
  const btnTrashPosition = (props.name === 'formDeleteCard') ? 'popup__btn-close_type_position-confirm' : '';

  return (
    <section
      className={`popup popup_type_${props.name} popup_overlay 
    ${props.isOpen ? 'popup_opened' : false} aria-label="всплывающее окно"`}>
      <div className="popup__container">
        <h2 className="popup__edit-header">{props.title}</h2>
        <form
          className="form"
          id={props.name}
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate>
          <>{props.children}</>
          <button className="popup__btn-save" type="submit">{props.btnName}</button>
        </form>
        <button
          className={`popup__btn-close ${btnAvatarPosition} ${btnTrashPosition}`}
          type="button"
          onClick={props.onClose} />
      </div>
    </section>
  )
}

export default PopupWithForm;
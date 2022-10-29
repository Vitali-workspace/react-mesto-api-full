
function InfoTooltip(props) {

  const titleStatus = (props.isOpen.status === 'success')
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.'
  const iconStatus = (props.isOpen.status === 'success')
    ? 'popup__icon-status'
    : 'popup__icon-status-fail'

  return (
    <section
      className={`popup popup_overlay 
    ${props.isOpen.open ? 'popup_opened' : false} aria-label="всплывающее окно"`}>
      <div className="popup__container popup__container_type_tooltip">
        <div className={iconStatus} />
        <h2 className="popup__edit-header popup__edit-header_type_tooltip">{titleStatus}</h2>
        <button
          className={`popup__btn-close popup__btn-close_type_position-tooltip`}
          type="button"
          onClick={props.onClose} />
      </div>
    </section>
  )
}

export default InfoTooltip;
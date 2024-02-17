const AppointmentItem = props => {
  const {details, toggleStar} = props
  const {id, title, date, isStarred} = details
  console.log(typeof date)
  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>{date}</p>

      <button data-testid="star" type="button" onClick={onClickStar}>
        <img src={imgUrl} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem

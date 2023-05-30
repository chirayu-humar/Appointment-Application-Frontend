// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {details, starTheMessage} = props
  const {title, date, isStarred, id} = details

  const onClickStar = () => {
    starTheMessage(id)
  }

  return (
    <li className="outer">
      <div className="first">
        <p>{title}</p>
        <div>
          <button onClick={onClickStar} type="button" data-testid="star">
            {isStarred && (
              <img
                alt="star"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              />
            )}
            {!isStarred && (
              <img
                alt="starred"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              />
            )}
          </button>
        </div>
      </div>
      <div className="second">
        <p>{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
      </div>
    </li>
  )
}

export default AppointmentItem

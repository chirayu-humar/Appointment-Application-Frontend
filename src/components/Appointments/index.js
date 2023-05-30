// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    AppointmentsArray: [],
    date: '',
    onlyStarred: false,
  }

  onChangeTitle = event => {
    const {value} = event.target
    this.setState(prevState => ({
      AppointmentsArray: prevState.AppointmentsArray,
      title: value,
      date: prevState.date,
      onlyStarred: prevState.onlyStarred,
    }))
  }

  onChangeDate = event => {
    const {value} = event.target
    this.setState(prevState => ({
      AppointmentsArray: prevState.AppointmentsArray,
      title: prevState.title,
      date: value,
      onlyStarred: prevState.onlyStarred,
    }))
  }

  onSubmitFunction = event => {
    event.preventDefault()
    console.log('onSubmitFunctionCalled')
    this.setState(prevState => ({
      AppointmentsArray: [
        ...prevState.AppointmentsArray,
        {
          title: prevState.title,
          date: prevState.date,
          isStarred: false,
          id: uuidv4(),
        },
      ],
      title: '',
      date: '',
      onlyStarred: prevState.onlyStarred,
    }))
  }

  starTheMessage = id => {
    console.log('starTheMessage')
    this.setState(prevState => ({
      AppointmentsArray: prevState.AppointmentsArray.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
      title: prevState.title,
      date: prevState.date,
      isStarred: prevState.isStarred,
    }))
  }

  presentOnlyStarred = () => {
    this.setState(prevState => ({
      AppointmentsArray: prevState.AppointmentsArray,
      title: prevState.title,
      date: prevState.date,
      onlyStarred: !prevState.onlyStarred,
    }))
  }

  render() {
    const {AppointmentsArray, title, date, onlyStarred} = this.state
    const appointmentList = AppointmentsArray.filter(
      each => !onlyStarred || each.isStarred,
    )
    return (
      <div className="bg-container">
        <div className="outerDiv">
          {/* first div started */}
          <div className="firstDiv">
            <div className="firstDivChild1">
              <form onSubmit={this.onSubmitFunction}>
                <h1>Add Appointment</h1>
                <label htmlFor="title">Title</label>
                <input
                  value={title}
                  onChange={this.onChangeTitle}
                  id="title"
                  type="text"
                />
                <label htmlFor="date">Date</label>
                <input
                  value={date}
                  onChange={this.onChangeDate}
                  id="date"
                  type="date"
                />
                <div>
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
            <div className="firstDivChild2">
              <img
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          {/* first div ended */}
          {/* second div started */}
          <ul className="secondDiv">
            <hr />
            <li className="list">
              <div>
                <h1>Appointments</h1>
              </div>
              <div>
                <button onClick={this.presentOnlyStarred} type="button">
                  Starred
                </button>
              </div>
            </li>
            {appointmentList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                starTheMessage={this.starTheMessage}
                details={eachItem}
              />
            ))}
          </ul>
          {/* second div ended */}
        </div>
      </div>
    )
  }
}

export default Appointments

import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

const initialList = []

class Appointments extends Component {
  state = {
    appointmentList: initialList,
    title: '',
    date: '',
    isFilterActive: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onFilter = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  filteredAppointments = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {title, date} = this.state
    const filteredData = this.filteredAppointments()
    return (
      <div>
        <div className="form-container">
          <form onSubmit={this.addAppointment}>
            <h1>Add Appointments</h1>
            <label htmlFor="title">Title</label>
            <input
              value={title}
              id="title"
              type="text"
              onChange={this.onChangeTitle}
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              value={date}
              id="date"
              onChange={this.onChangeDate}
            />
            <br />
            <button type="submit">Add</button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
          />
        </div>
        <hr />
        <div>
          <button type="button" onClick={this.onFilter}>
            Starred
          </button>
          <ul className="list-container">
            {filteredData.map(each => (
              <AppointmentItem
                key={each.id}
                details={each}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments

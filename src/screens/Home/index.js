
import SimpleButton from 'components/SimpleButton'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import moment from 'moment'
import { Icon } from 'semantic-ui-react'

import MonthCalendar from 'components/MonthCalendar'
import { EventSchema, RouterHistorySchema, RouterMatchSchema } from 'schemas'

import styles from './index.scss'

class Home extends React.PureComponent {
  navToNextMonth = () => {
    const day = +(this.props.match.params.day || new Date())
    this.props.history.push(`/${moment(day).add(1, 'months').valueOf()}`)
  }

  navToPreviousMonth = () => {
    const day = +(this.props.match.params.day || new Date())
    this.props.history.push(`/${moment(day).add(-1, 'months').valueOf()}`)
  }

  navToCurrentMonth = () => {
    this.props.history.push(`/${moment().valueOf()}`)
  }

  onAddEvent = day => this.props.history.push(`/event/new/${day}`)

  onEditEvent = ({ datetime, id }) => this.props.history.push(`/event/${id}/${datetime}`)

  render() {
    const day = +(this.props.match.params.day || new Date())

    return (
      <div>
        <div className={styles.body}>
          <h1>
            <SimpleButton onClick={this.navToPreviousMonth}>
              <Icon link name="chevron left" />
            </SimpleButton>
            {moment(day).format('MMMM YYYY')}
            <SimpleButton onClick={this.navToNextMonth}>
              <Icon link name="chevron right" />
            </SimpleButton>
            {!moment().isSame(moment(day), 'month') && (
              <small>
                <SimpleButton onClick={this.navToCurrentMonth}>Today</SimpleButton>
              </small>
            )}
          </h1>
          <div>
            <MonthCalendar
              events={this.props.events}
              month={day}
              onAddEvent={this.onAddEvent}
              onEditEvent={this.onEditEvent}
            />
          </div>
        </div>
        <footer className={styles.footer}>
          <b>Current date: </b>
          {moment().format('YYYY-MM-DD')}
        </footer>
      </div>
    )
  }
}

Home.propTypes = {
  events: PropTypes.arrayOf(EventSchema).isRequired,
  history: RouterHistorySchema.isRequired,
  match: RouterMatchSchema.isRequired,
}

export default connect(({ events }) => ({ events }))(Home)

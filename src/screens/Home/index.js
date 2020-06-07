
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import moment from 'moment'

import MonthCalendar from 'components/MonthCalendar'
import { EventSchema, RouterHistorySchema } from 'schemas'

import styles from './index.scss'

class Home extends React.PureComponent {
  onAddEvent = day => this.props.history.push(`/event/new/${day}`)

  render() {
    return (
      <div>
        <div className={styles.body}>
          <h1>{moment().format('MMMM YYYY')}</h1>
          <div>
            <MonthCalendar events={this.props.events} onAddEvent={this.onAddEvent} />
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
}

export default connect(({ events }) => ({ events }))(Home)

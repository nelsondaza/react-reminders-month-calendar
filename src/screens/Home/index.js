
import React from 'react'

import moment from 'moment'

import MonthCalendar from 'components/MonthCalendar'
import { RouterHistorySchema } from 'schemas'

import styles from './index.scss'

class Home extends React.PureComponent {
  onAddEvent = day => this.props.history.push(`/event/new/${day}`)

  render() {
    return (
      <div>
        <div className={styles.body}>
          <h1>{moment().format('MMMM YYYY')}</h1>
          <div>
            <MonthCalendar events={[]} onAddEvent={this.onAddEvent} />
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
  history: RouterHistorySchema.isRequired,
}

export default Home

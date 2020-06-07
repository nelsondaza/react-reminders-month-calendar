
import React from 'react'

import moment from 'moment'

import SimpleButton from 'components/SimpleButton'
import { RouterHistorySchema, RouterMatchSchema } from 'schemas'

import styles from './index.scss'

class Home extends React.PureComponent {
  onBackClick = () => this.props.history.push('/')

  render() {
    const day = moment(+this.props.match.params.day)
    return (
      <div>
        <div className={styles.body}>
          <h1>Reminder creation</h1>
          <div>
            <SimpleButton onClick={this.onBackClick} value="< calendar" />
          </div>
          <div>
            {day.toISOString()}
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
  match: RouterMatchSchema.isRequired,
}

export default Home

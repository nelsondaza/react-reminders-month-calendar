
import React from 'react'

import moment from 'moment'

import SimpleButton from 'components/SimpleButton'
import { RouterHistorySchema } from 'schemas'

import styles from './index.scss'

class Home extends React.PureComponent {
  onBackClick = () => this.props.history.push('/')

  render() {
    return (
      <div>
        <div className={styles.body}>
          <h1>Reminder creation</h1>
          <div>
            <SimpleButton onClick={this.onBackClick} value="< calendar" />
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

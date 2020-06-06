
import React from 'react'

import moment from 'moment'

import styles from './index.scss'

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <div className={styles.body}>
          content
        </div>
        <footer className={styles.footer}>
          <b>Current date: </b>
          {moment().format('YYYY-MM-DD')}
        </footer>
      </div>
    )
  }
}

export default Home

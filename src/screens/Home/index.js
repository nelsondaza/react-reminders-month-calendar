
import React from 'react'

import moment from 'moment'

import styles from './index.scss'

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <div className={styles.body}>
          <h1>{moment().format('MMMM YYYY')}</h1>
          <div>
            content
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

export default Home

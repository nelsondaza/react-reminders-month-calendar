
import React from 'react'

import styles from './index.scss'

class Home extends React.PureComponent {
  render() {
    const date = new Date()

    return (
      <div>
        <div className={styles.body}>
          content
        </div>
        <footer className={styles.footer}>
          <b>Current date: </b>
          {[
            date.getFullYear(),
            `00${date.getMonth()}`.slice(-2),
            `00${date.getDate()}`.slice(-2),
          ].join('-')}
        </footer>
      </div>
    )
  }
}

export default Home

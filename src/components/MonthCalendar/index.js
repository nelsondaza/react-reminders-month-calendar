
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import styles from './index.scss'

class MonthCalendar extends React.PureComponent {
  render() {
    const { className } = this.props
    return (
      <div className={classnames(className, styles.wrapper)}>
        <div className={styles.titles}>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div className={styles.days}>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div className={styles.days}>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div className={styles.days}>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div className={styles.days}>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
      </div>
    )
  }
}

MonthCalendar.propTypes = {
  className: PropTypes.string,
}

MonthCalendar.defaultProps = {
  className: '',
}

export default MonthCalendar

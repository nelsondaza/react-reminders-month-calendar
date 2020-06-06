
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import moment from 'moment'

import Day from './Day'

import styles from './index.scss'

class MonthCalendar extends React.PureComponent {
  renderDays() {
    const today = moment().startOf('day')
    const firstDay = today.clone()
      .startOf('month').startOf('week')
    const lastDay = today.clone()
      .endOf('month').endOf('week')

    const days = []
    while(lastDay.diff(firstDay, 'days', true) >= 0) {
      days.push(
        <Day
          active={firstDay.isSame(today, 'day')}
          className={styles.day}
          day={firstDay.format('D')}
          highlight={firstDay.format('d') === '0'}
          key={firstDay.valueOf()}
          readOnly={!firstDay.isSame(today, 'month')}
        />
      )
      firstDay.add(1, 'days')
    }

    return days
  }

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
        <div className={styles.body}>
          {this.renderDays()}
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

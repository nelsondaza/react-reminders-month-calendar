
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import moment from 'moment'

import EventSchema from 'schemas/EventSchema'

import Day from './Day'

import styles from './index.scss'

class MonthCalendar extends React.PureComponent {
  getDayEvents = day => this.props.events
    .filter(event => moment(event.datetime).isSame(day, 'day'))

  renderDays() {
    const month = moment(this.props.month)
    const today = moment().startOf('day')

    const firstDay = month.clone()
      .startOf('month').startOf('week')
    const lastDay = month.clone()
      .endOf('month').endOf('week')

    const days = []
    while (lastDay.diff(firstDay, 'days', true) >= 0) {
      const value = firstDay.valueOf()
      const readOnly = !firstDay.isSame(month, 'month')
      days.push(
        <Day
          active={firstDay.isSame(today, 'day')}
          className={readOnly ? styles.day : styles.activeDay}
          day={firstDay.format('D')}
          events={this.getDayEvents(firstDay)}
          highlight={firstDay.format('d') === '0'}
          key={value}
          onAddEvent={() => this.props.onAddEvent(value)}
          onEditEvent={this.props.onEditEvent}
          onRemoveEvent={this.props.onRemoveEvent}
          readOnly={readOnly}
        />,
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
  events: PropTypes.arrayOf(EventSchema).isRequired,
  onAddEvent: PropTypes.func.isRequired,
  onEditEvent: PropTypes.func.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,

  month: PropTypes.number,
  className: PropTypes.string,
}

MonthCalendar.defaultProps = {
  month: moment().valueOf(),
  className: '',
}

export default MonthCalendar

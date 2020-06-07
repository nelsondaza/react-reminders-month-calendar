
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import moment from 'moment'

import Chip from 'components/Chip'
import SimpleButton from 'components/SimpleButton'
import EventSchema from 'schemas/EventSchema'

import styles from './index.scss'

class Day extends React.PureComponent {
  getTotalHiddenEvents = () => (
    this.props.events.length > this.props.maxVisibleEvents
      ? this.props.events.length - this.props.maxVisibleEvents
      : 0
  )

  onAddEvent = evt => !this.props.readOnly && evt.target.nodeName !== 'BUTTON' && this.props.onAddEvent(evt)

  renderEvents() {
    const { events, maxVisibleEvents, readOnly } = this.props
    return [...events]
      .sort((a, b) => (a.datetime > b.datetime ? 1 : 0))
      .slice(0, maxVisibleEvents)
      .map(event => (
        <Chip
          ariaLabel={`${event.city.name} ${moment(event.datetime).format('hh:mm a')}: ${event.description}`}
          className={styles.event}
          disabled={readOnly}
          key={event.id}
        >
          {event.description}
        </Chip>
      ))
  }

  render() {
    const { active, className, day, highlight, readOnly } = this.props
    const totalHiddenElements = this.getTotalHiddenEvents()

    return (
      <div
        className={classnames(
          className,
          styles.wrapper,
          readOnly && styles.readOnly,
          highlight && styles.highlight,
        )}
        role="link"
        onClick={this.onAddEvent}
        onKeyPress={this.onAddEvent}
        tabIndex={readOnly ? -1 : 0}
      >
        <div className={classnames(styles.number, active && styles.active)}>
          <span>{day}</span>
        </div>
        <div className={styles.events}>
          {this.renderEvents()}
        </div>
        {totalHiddenElements > 0 && (
          <div className={styles.more}>
            <SimpleButton disabled={readOnly} value={`+ ${totalHiddenElements} more`} primary />
          </div>
        )}
      </div>
    )
  }
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(EventSchema).isRequired,
  onAddEvent: PropTypes.func.isRequired,

  active: PropTypes.bool,
  className: PropTypes.string,
  highlight: PropTypes.bool,
  maxVisibleEvents: PropTypes.number,
  readOnly: PropTypes.bool,
}

Day.defaultProps = {
  active: false,
  className: '',
  highlight: false,
  maxVisibleEvents: 3,
  readOnly: false,
}

export default Day

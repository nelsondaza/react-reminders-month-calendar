
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import moment from 'moment'
import { Icon } from 'semantic-ui-react'

import Chip from 'components/Chip'
import EventSchema from 'schemas/EventSchema'
import SimpleButton from 'components/SimpleButton'

import styles from './index.scss'

class Day extends React.PureComponent {
  state = {
    expanded: false,
  }

  getTotalHiddenEvents = () => (
    this.props.events.length > this.props.maxVisibleEvents
      ? this.props.events.length - this.props.maxVisibleEvents
      : 0
  )

  onAddEvent = evt => (
    !this.props.readOnly
    && evt.target.nodeName !== 'BUTTON'
    && evt.target.className !== styles.cover
    && this.props.onAddEvent(evt)
  )

  onCollapse = () => this.setState({ expanded: false })

  onRemoveAllEvents = () => this.props.events.forEach(this.props.onRemoveEvent)

  renderEvents(maxVisibleEvents) {
    const { events, onEditEvent, readOnly } = this.props
    return [...events]
      .sort((a, b) => (a.datetime - b.datetime))
      .slice(0, maxVisibleEvents)
      .map(event => (
        <Chip
          ariaLabel={`${event.city.name} ${moment(event.datetime).format('hh:mm a')}: ${event.description}`}
          className={styles.event}
          disabled={readOnly}
          key={event.id}
          style={{ color: event.color }}
          onClick={() => onEditEvent(event)}
        >
          {event.description}
        </Chip>
      ))
  }

  render() {
    const {
      active,
      className,
      day,
      events,
      highlight,
      maxVisibleEvents,
      readOnly,
    } = this.props
    const { expanded } = this.state
    const totalHiddenElements = this.getTotalHiddenEvents()

    return (
      <div
        className={classnames(
          className,
          styles.wrapper,
          readOnly && styles.readOnly,
          highlight && styles.highlight,
          expanded && styles.expanded,
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
          {this.renderEvents(maxVisibleEvents)}
          {expanded && (
            <>
              <div
                className={styles.cover}
                onClick={this.onCollapse}
                onKeyPress={this.onCollapse}
                role="link"
                tabIndex={-1}
              />
              <div className={styles.list}>
                {this.renderEvents(events.length)}
              </div>
            </>
          )}
        </div>
        {!expanded && (
          <div className={styles.more}>
            {totalHiddenElements > 0 && (
              <SimpleButton
                disabled={readOnly}
                onClick={() => this.setState({ expanded: true })}
                primary
                value={`+ ${totalHiddenElements} more`}
              />
            )}
            {!readOnly && this.props.events.length > 0 && (
              <SimpleButton
                className={styles.remove}
                onClick={this.onRemoveAllEvents}
              >
                <Icon fitted color="red" name="trash alternate outline" />
              </SimpleButton>
            )}
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
  onEditEvent: PropTypes.func.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,

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

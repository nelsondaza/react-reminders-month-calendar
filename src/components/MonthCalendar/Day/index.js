
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import Chip from 'components/Chip'
import SimpleButton from 'components/SimpleButton'
import EventSchema from 'schemas/EventSchema'

import styles from './index.scss'

class Day extends React.PureComponent {
  render() {
    const { active, className, day, events, highlight, readOnly } = this.props

    return (
      <div
        className={classnames(
          className,
          styles.wrapper,
          readOnly && styles.readOnly,
          highlight && styles.highlight,
        )}
      >
        <div className={classnames(styles.number, active && styles.active)}>
          <span>{day}</span>
        </div>
        <div className={styles.events}>
          {events.map(event => (
            <Chip
              className={styles.event}
              disabled={readOnly}
              key={event.id}
            >
              {event.description}
            </Chip>
          ))}
        </div>
        <div className={styles.more}>
          <SimpleButton disabled={readOnly} value="+ 12 more" primary />
        </div>
      </div>
    )
  }
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(EventSchema).isRequired,

  active: PropTypes.bool,
  className: PropTypes.string,
  highlight: PropTypes.bool,
  readOnly: PropTypes.bool,
}

Day.defaultProps = {
  active: false,
  className: '',
  highlight: false,
  readOnly: false,
}

export default Day

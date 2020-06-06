
import SimpleButton from 'components/SimpleButton'
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import styles from './index.scss'

class Day extends React.PureComponent {
  render() {
    const { className, day, highlight, readOnly } = this.props
    return (
      <div
        className={classnames(
          className,
          styles.wrapper,
          readOnly && styles.readOnly,
          highlight && styles.highlight,
        )}
      >
        <div className={styles.number}>{day}</div>
        <div className={styles.events}>
          <div>Sunday</div>
          <div>Monday</div>
          <div>Saturday</div>
          <div>Saturday</div>
          <div>Saturday</div>
          <div>Saturday</div>
        </div>
        <div className={styles.more}>
          <SimpleButton value="+ 12 more" primary />
        </div>
      </div>
    )
  }
}

Day.propTypes = {
  day: PropTypes.string.isRequired,

  className: PropTypes.string,
  highlight: PropTypes.bool,
  readOnly: PropTypes.bool,
}

Day.defaultProps = {
  className: '',
  highlight: false,
  readOnly: false,
}

export default Day

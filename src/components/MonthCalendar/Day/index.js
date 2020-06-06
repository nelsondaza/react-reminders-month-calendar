
import SimpleButton from 'components/SimpleButton'
import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import styles from './index.scss'

class Day extends React.PureComponent {
  render() {
    const { className, day, readOnly } = this.props
    return (
      <div className={classnames(className, styles.wrapper, readOnly && styles.readOnly)}>
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
  day: PropTypes.number.isRequired,

  className: PropTypes.string,
  readOnly: PropTypes.bool,
}

Day.defaultProps = {
  className: '',
  readOnly: false,
}

export default Day


import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import Chip from 'components/Chip'
import SimpleButton from 'components/SimpleButton'

import styles from './index.scss'

class Day extends React.PureComponent {
  render() {
    const { active, className, day, highlight, readOnly } = this.props
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
          <Chip disabled={readOnly} className={styles.event}>Sunday ad fasdf asdf a</Chip>
          <Chip disabled={readOnly} className={styles.event}>Monday</Chip>
          <Chip disabled={readOnly} className={styles.event}>Saturday</Chip>
          <Chip disabled={readOnly} className={styles.event}>Saturday</Chip>
          <Chip disabled={readOnly} className={styles.event}>Saturday</Chip>
          <Chip disabled={readOnly} className={styles.event}>Saturday</Chip>
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

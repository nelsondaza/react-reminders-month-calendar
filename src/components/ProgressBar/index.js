
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './index.scss'

class ProgressBar extends React.PureComponent {
  getValue = () => Math.min(Math.max(this.props.value, 0), 100)

  render() {
    const { alert, ariaLabel, className, inverted, tabIndex } = this.props
    const value = this.getValue()
    const hiddenPercentage = `${100 - value}%`

    return (
      <div
        aria-label={ariaLabel}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        className={classnames(
          className,
          styles.wrapper,
          alert && styles.alert,
          inverted && styles.inverted,
          value === 100 && styles.complete,
        )}
        role="progressbar"
        tabIndex={tabIndex}
      >
        <div className={styles.bar} style={{ width: hiddenPercentage }} />
      </div>
    )
  }
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,

  alert: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  inverted: PropTypes.bool,
  tabIndex: PropTypes.number,
}

ProgressBar.defaultProps = {
  alert: false,
  ariaLabel: null,
  className: '',
  inverted: false,
  tabIndex: 0,
}

export default ProgressBar


import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import { ChildrenSchema } from 'schemas'

import styles from './index.scss'

class Chip extends React.PureComponent {
  render() {
    const {
      active,
      ariaLabel,
      className,
      children,
      value,
      ...props
    } = this.props

    return (
      <button
        {...props}
        aria-label={ariaLabel}
        className={classnames(
          styles.button,
          className,
        )}
        type="button"
        value={value !== null && value !== undefined ? value : ariaLabel}
      >
        {children}
      </button>
    )
  }
}

Chip.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: ChildrenSchema.isRequired,

  active: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

Chip.defaultProps = {
  active: false,
  className: '',
  value: null,
}

export default Chip


import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Icon from 'components/Icon'
import { ChildrenSchema } from 'schemas'

import styles from './index.scss'

class SimpleButton extends React.PureComponent {
  render() {
    const {
      ariaLabel,
      className,
      children,
      icon,
      itemsDirection,
      primary,
      secondary,
      tertiary,
      value,
      ...props
    } = this.props
    const iconButton = !!icon && !(children || value)

    return (
      <button
        {...props}
        aria-label={ariaLabel || value}
        className={classnames(
          styles.button,
          className,
          iconButton && styles.iconButton,
          itemsDirection === 'rtl' && styles.itemsRTL,
          itemsDirection === 'ttb' && styles.itemsTTB,
          itemsDirection === 'btt' && styles.itemsBTT,
          tertiary && styles.tertiary,
          secondary && styles.secondary,
          primary && styles.primary,
        )}
        type="button"
        value={value || ariaLabel}
      >
        {!!icon && (
          <Icon
            className={classnames(
              styles.icon,
              !iconButton && styles.iconSpace,
            )}
            name={icon}
          />
        )}
        <span>{children || value}</span>
      </button>
    )
  }
}

SimpleButton.propTypes = {
  ariaLabel: PropTypes.string,
  children: ChildrenSchema,
  className: PropTypes.string,
  icon: PropTypes.string,
  itemsDirection: PropTypes.oneOf(['ltr', 'rtl', 'ttb', 'btt']),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  value: PropTypes.string,
}

SimpleButton.defaultProps = {
  ariaLabel: null,
  children: null,
  className: '',
  icon: null,
  itemsDirection: 'ltr',
  primary: false,
  secondary: false,
  tertiary: false,
  value: null,
}

export default SimpleButton


import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

import { ChildrenSchema } from 'schemas'

import Icon from '../Icon'

import styles from './index.scss'

class Link extends React.PureComponent {
  render() {
    const { as, children, className, href, ...props } = this.props
    const Element = as || RouterLink
    return (
      <Element
        {...props}
        className={classnames(className, styles.link)}
        href={href}
        to={href}
      >
        {children}
        {
          !!props.target
          && props.target === '_blank'
          && <Icon name="external" className={styles.icon} />
        }
      </Element>
    )
  }
}

Link.propTypes = {
  children: ChildrenSchema.isRequired,
  href: PropTypes.string.isRequired,

  as: PropTypes.string,
  className: PropTypes.string,
}

Link.defaultProps = {
  as: null,
  className: '',
}

export default Link

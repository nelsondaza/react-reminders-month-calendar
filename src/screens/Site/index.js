
import React from 'react'
import PropTypes from 'prop-types'

import { ChildrenSchema } from 'schemas'

import '../../../config/assets/semantic-ui/semantic.css'
import './index.scss'

class Site extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children } = this.props
    return (
      <main className="Site" role="main">
        {children}
      </main>
    )
  }
}

Site.propTypes = {
  children: ChildrenSchema.isRequired,

  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

Site.defaultProps = {
  location: { pathname: '' },
}

export default Site

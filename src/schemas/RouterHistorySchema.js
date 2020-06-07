
import PropTypes from 'prop-types'

export default PropTypes.shape({
  createHref: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  length: PropTypes.number,
  listen: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
})

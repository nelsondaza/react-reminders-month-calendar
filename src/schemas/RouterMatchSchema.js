
import PropTypes from 'prop-types'

export default PropTypes.shape({
  params: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }).isRequired,
  path: PropTypes.string,
  url: PropTypes.string,
})

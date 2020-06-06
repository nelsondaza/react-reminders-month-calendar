
import PropTypes from 'prop-types'

export default PropTypes.shape({
  country: PropTypes.string,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

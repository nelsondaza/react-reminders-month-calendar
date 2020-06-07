
import PropTypes from 'prop-types'

export default PropTypes.shape({
  description: PropTypes.string,
  icon: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

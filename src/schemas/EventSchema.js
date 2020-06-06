
import PropTypes from 'prop-types'

import CitySchema from './CitySchema'

export default PropTypes.shape({
  city: CitySchema.isRequired,
  color: PropTypes.string,
  datetime: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  forecast: PropTypes.string,
  id: PropTypes.number.isRequired,
})

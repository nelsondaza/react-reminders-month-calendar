
import PropTypes from 'prop-types'

import CitySchema from './CitySchema'
import WeatherSchema from './WeatherSchema'

export default PropTypes.shape({
  city: CitySchema.isRequired,
  color: PropTypes.string,
  datetime: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  forecast: WeatherSchema.isRequired,
  id: PropTypes.number.isRequired,
})

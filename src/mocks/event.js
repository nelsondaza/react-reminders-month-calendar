
import buildMock from './buildMock'
import city from './city'
import weather from './weather'

export default data => buildMock(data, {
  city: city(),
  color: '#3B6CF6',
  datetime: 1591468704052,
  description: 'Event description',
  forecast: weather(),
  id: 30,
})

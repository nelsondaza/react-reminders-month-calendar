
export const getAPI = (props) => {
  const endpoint = 'https://api.openweathermap.org/data/2.5/forecast/daily'
  const params = {
    q: '', // required
    type: 'like',
    cnt: 17, // max per month for the API service
    appid: '4261fc9ccbfd90c8600afd9bc9cfc6bf',
    units: 'metric',
    ...props,
  }
  const query = Object.entries(params)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')

  return `${endpoint}?${query}`
}

export const getIconImageURL = icon => `http://openweathermap.org/img/wn/${icon}.png`

export const getRandomElement = items => items[Math.floor(Math.random() * items.length)]

export const fakeEvent = (startDatetime, endDatetime) => {
  const dif = endDatetime - startDatetime
  return {
    city: {
      country: getRandomElement(['co', 'us', 'es', 'cl', 'pe']),
      id: +(new Date()),
      name: getRandomElement(['Santiago', 'Bogotá', 'NY', 'Paz', 'DF']),
    },
    color: getRandomElement([
      '#3B6CF6',
      '#8BA8F9',
      '#238752',
      '#32C376',
      '#F56600',
      '#FF8D00',
      '#E82118',
      '#F58F8A',
      '#00857E',
      '#00BFB6',
      '#FBBD08',
    ]),
    datetime: startDatetime + Math.round(dif * Math.random()),
    description: getRandomElement([
      'It’s an undocumented feature!',
      'Things aren’t always #000000 and #FFFFFF',
      'Talk is cheap. Show me the code.',
      'If at first you don’t succeed; call it version 1.0',
      'You darling is my semicolon.',
    ]),
    forecast: {
      description: 'moderate... something',
      icon: getRandomElement(['10d', '01d', '02n', '10d', '13n', '03n']),
      id: +(new Date()),
      main: 'Rain (Always)',
    },
    id: +(new Date()),
  }
}

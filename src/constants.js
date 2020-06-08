
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

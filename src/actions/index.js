
export * from './events'
export * from './cities'

export const getInitialState = () => ({
  cities: {
    key: '',
    data: [],
    loaded: false,
    loading: false,
  },
  events: [],
})

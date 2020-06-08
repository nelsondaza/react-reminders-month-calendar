
export * from './events'
export * from './cities'

export const getInitialState = () => ({
  cities: {
    data: null,
    error: null,
    key: '',
    loaded: false,
    loading: false,
  },
  events: [],
})

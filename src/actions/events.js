
export const EVENTS_ADD = 'EVENTS_ADD'
export const EVENTS_REMOVE = 'EVENTS_REMOVE'

export const eventsAdd = event => ({
  payload: event,
  type: EVENTS_ADD,
})

export const eventsRemove = id => ({
  payload: id,
  type: EVENTS_REMOVE,
})

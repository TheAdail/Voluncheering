export const FETCHING_EVENTS = 'FETCHING_EVENTS'
export const UPDATE_EVENTS = 'UPDATE_EVENTS'

export function fetchEvents() {
  return {
    type: FETCHING_EVENTS,
  }
}

export function updateEvents(events) {
  return {
    type: UPDATE_EVENTS,
    events: events,
  }
}
import { db, fbNow } from '~/config/fire'

export const JOIN_EVENT = 'JOIN_EVENT'
export const LEAVE_EVENT = 'LEAVE_EVENT'

export function joinEvent(eventId, userId) {
  var updates = {}
  updates[`/users/${userId}/events/${eventId}`] = {
    joined: fbNow,
    resigned: null
  }
  updates[`/events/${eventId}/users/${userId}`] = {
    joined: fbNow,
    resigned: null
  }
  db.update(updates)

  return {
    type: JOIN_EVENT,
  }
}

export function leaveEvent(eventId, userId) {
  var updates = {}
  updates[`/users/${userId}/events/${eventId}/resigned`] = fbNow
  updates[`/events/${eventId}/users/${userId}/resigned`] = fbNow
  db.update(updates)

  return {
    type: LEAVE_EVENT,
  }
}
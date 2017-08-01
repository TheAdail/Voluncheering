import { db, fbNow } from '~/config/fire'

export const JOIN_OPPORTUNITY = 'JOIN_OPPORTUNITY'
export const LEAVE_OPPORTUNITY = 'LEAVE_OPPORTUNITY'

export function joinOpportunity(opportunityId, userId) {
  var updates = {}
  updates[`/users/${userId}/opportunities/${opportunityId}`] = {
    joined: fbNow,
    resigned: null
  }
  updates[`/opportunities/${opportunityId}/users/${userId}`] = {
    joined: fbNow,
    resigned: null
  }
  db.update(updates)

  return {
    type: JOIN_OPPORTUNITY,
  }
}

export function leaveOpportunity(opportunityId, userId) {
  var updates = {}
  updates[`/users/${userId}/opportunities/${opportunityId}/resigned`] = fbNow
  updates[`/opportunities/${opportunityId}/users/${userId}/resigned`] = fbNow
  db.update(updates)

  return {
    type: LEAVE_OPPORTUNITY,
  }
}
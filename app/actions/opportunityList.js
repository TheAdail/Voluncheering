export const FETCHING_OPPORTUNITIES = 'FETCHING_OPPORTUNITIES'
export const UPDATE_OPPORTUNITIES = 'UPDATE_OPPORTUNITIES'

export function fetchOpportunities() {
  return {
    type: FETCHING_OPPORTUNITIES,
  }
}

export function updateOpportunities(opportunities) {
  return {
    type: UPDATE_OPPORTUNITIES,
    value: opportunities,
  }
}
import {
  JOIN_EVENT,
  LEAVE_EVENT,
} from '~/actions/event'

export default (state = {}, action) => {
  switch (action.type) {
    case JOIN_EVENT:
    case LEAVE_EVENT:
    default:
      return state
  }
}
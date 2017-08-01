import { 
  JOIN_OPPORTUNITY,
  LEAVE_OPPORTUNITY,
} from '~/actions/opportunity'

export default (state = {}, action) => {
  switch (action.type) {
    case JOIN_OPPORTUNITY:
    case LEAVE_OPPORTUNITY:
    default:
      return state
  }
}
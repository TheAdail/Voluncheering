import {
  UPDATE_USER_EVENTS,
  UPDATE_USER_PROFILE,
} from '~/actions/user'
import { LOGOUT } from '~/actions/auth'

const initialState = {
  profile: {},
  events: {},
}

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_USER_PROFILE :
      return {
        ...state,
        profile: action.profile,
      }

    case UPDATE_USER_EVENTS :
      return {
        ...state,
        events: action.events,
      }

    case LOGOUT :
      return initialState

    default :
      return state
  }
}
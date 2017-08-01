import {
  UPDATE_USER_OPPORTUNITIES,
  UPDATE_USER_PROFILE,
} from '~/actions/user'
import { LOGOUT } from '~/actions/auth'

const initialState = {
  profile: {},
  opportunities: {},
}

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_USER_PROFILE :
      return {
        ...state,
        profile: action.profile,
      }

    case UPDATE_USER_OPPORTUNITIES :
      return {
        ...state,
        opportunities: action.opportunities,
      }

    case LOGOUT :
      return initialState

    default :
      return state
  }
}
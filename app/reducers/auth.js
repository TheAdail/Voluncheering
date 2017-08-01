import {
  AUTH_SUCCESSFUL,
  AUTH_FAILED,
  LOGIN,
  REGISTER,
  REMEMBER_EMAIL,
  LOGOUT,
} from '~/actions/auth'
import { resetAuthenticationState } from '~/reducers/authentication'

let initialState = {
  isAuthed: false,
  isAuthenticating: false,
  authedId: '',
  lastEmailUsed: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticating: true,
      }

    case AUTH_FAILED:
      return {
        ...state,
        isAuthed: false,
        isAuthenticating: false,
        authedId: '',
      }

    case AUTH_SUCCESSFUL:
      return {
        ...state,
        isAuthed: true,
        isAuthenticating: false,
        authedId: action.uid,
      }

    case REMEMBER_EMAIL:
      return {
        ...state,
        lastEmailUsed: action.email,
      }

    case LOGOUT:
      return resetAuthenticationState(state)

    default:
      return state
  }
}
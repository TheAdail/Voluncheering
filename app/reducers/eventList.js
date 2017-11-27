import {
  FETCHING_EVENTS,
  UPDATE_EVENTS,
} from '~/actions/eventList'
import { LOGOUT } from '~/actions/auth'

const initialState = {
  isFetching: false,
  events: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_EVENTS :
      return {
        ...state,
        isFetching: true,
      }

    case UPDATE_EVENTS :
      return {
        ...state,
        isFetching: false,
        events: action.events,
      }

    case LOGOUT :
      return initialState

    default :
      return state
  }
}
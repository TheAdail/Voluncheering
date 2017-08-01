import {
  FETCHING_OPPORTUNITIES,
  UPDATE_OPPORTUNITIES,
} from '~/actions/opportunityList'
import { LOGOUT } from '~/actions/auth'

const initialState = {
  isFetching: false,
  opportunities: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_OPPORTUNITIES :
      return {
        ...state,
        isFetching: true,
      }

    case UPDATE_OPPORTUNITIES :
      return {
        ...state,
        isFetching: false,
        opportunities: action.value,
      }

    case LOGOUT :
      return initialState

    default :
      return state
  }
}
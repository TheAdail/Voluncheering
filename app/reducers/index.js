import { combineReducers } from 'redux'

import auth from './auth'
import nav from './nav'
import event from './event'
import eventList from './eventList'
import user from './user'

export default combineReducers({
  auth,
  nav,
  event,
  eventList,
  user,
})
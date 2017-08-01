import { combineReducers } from 'redux'

import auth from './auth'
import nav from './nav'
import opportunity from './opportunity'
import opportunityList from './opportunityList'
import user from './user'

export default combineReducers({
  auth,
  nav,
  opportunity,
  opportunityList,
  user,
})
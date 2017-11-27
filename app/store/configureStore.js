import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '~/reducers'
import { composeWithDevTools } from 'remote-redux-devtools'
import { watchAuthState, watchEvents } from '~/config/fire'
import { loadUserPrefs } from '~/actions/auth'

export default (initialState) => {
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

  store.dispatch(loadUserPrefs())

  watchAuthState(store)

  return store
}

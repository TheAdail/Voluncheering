import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '~/config/router'

const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'Login',
	  }),
	],
}))

const homeAction = AppNavigator.router.getActionForPathAndParams('Home')
const homeNavState = AppNavigator.router.getStateForAction(homeAction)

export default function nav(state = initialNavState, action) {
  let nextState
  switch (action.routeName) {
    // case 'Login':
    //   nextState = homeNavState
    //   break

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

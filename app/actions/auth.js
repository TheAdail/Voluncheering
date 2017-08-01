import { AccessToken, LoginManager } from  'react-native-fbsdk'
import DefaultPreference from 'react-native-default-preference'
import { NavigationActions } from 'react-navigation'

import {
  db,
  facebookProvider,
  fbNow,
  firebaseAuth,
} from '~/config/fire'

import { saveProfile } from '~/actions/user'

export const LOGIN = 'LOGIN'
export const AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL'
export const AUTH_FAILED = 'AUTH_FAILED'
export const REGISTER = 'REGISTER'
export const REMEMBER_EMAIL = 'REMEMBER_EMAIL'
export const LOGOUT = 'LOGOUT'

// Dispatch LOGOUT action and navigates to Login
export function logout() {
  return dispatch => {
    LoginManager.logOut()
    firebaseAuth.signOut()
    db.off()
    dispatch({type: LOGOUT})
    dispatch(NavigationActions.navigate({routeName: 'Login'}))
  }
}

// Dispatch AUTH_SUCCESSFUL action and navigates to Home
// The action dispatch stores user id on auth substate
export function authDidSucceed(userId) {
  return dispatch => {
    dispatch({type: AUTH_SUCCESSFUL, uid: userId})
    dispatch(NavigationActions.navigate({ routeName: 'Home'}))
  }
}

function authDidFail() {
  return {
    type: AUTH_FAILED
  }
}

function rememberEmail(email) {
  return {
    type: REMEMBER_EMAIL,
    email,
  }
}

export function setLastEmailUsed(email) {
  return function(dispatch) {
    DefaultPreference.set('lastEmailUsed', email)
    dispatch(rememberEmail(email))
  }
}

export function loadUserPrefs() {
  return function(dispatch) {
    DefaultPreference.get('lastEmailUsed')
      .then((email) => {
        if(email !== undefined) {
          dispatch(rememberEmail(email))
        }
      })
  }
}


export function updatePassword(password) {
  return function(dispatch) {
    let user = firebaseAuth.currentUser
    if(user) {
      user.updatePassword(password)
        // .then(() => {},
        // (error) => {}
      // )
    }
  }
}

export function updateEmail(email) {
  return function(dispatch) {
    let user = firebaseAuth.currentUser
    if(user) {
      user.updateEmail(email)
        // .then(() => {},
        // (error) => {}
      // )
    }
  }
}

export function loginWithEmailAndPassword(email, password) {
  return dispatch => {
    dispatch({type: LOGIN})
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(setLastEmailUsed(email))
        // THE AUTH_SUCCESSFUL IS DISPATCHED AUTOMATICALLY WHEN
        // LOGIN STATE IS CHANGED BY FIREBASE
        // CHECK ~/config/fire.js
      })
      .catch(error => {
        dispatch(authDidFail())
        Alert.alert('Authentication failed', error.message)
      })
  }
}

export function handleAuthViaFacebook() {
  return dispatch => {
    dispatch({type: LOGIN})
    AccessToken.getCurrentAccessToken()
      .then(({accessToken}) => {
        firebaseAuth
          .signInWithCredential(facebookProvider.credential(accessToken))
      })
      .catch(error => {
        dispatch(authDidFail())
        Alert.alert('Authentication failed', error.message)
      })
  }
}

// Sign up with email, password and profile info
export function signUpWithEmailPasswordAndProfile(email, password, profile, errorHandler) {
  return dispatch => {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const p = {
          ...profile,
          uid: user.uid,
          providerId: user.providerData[0].providerId,
          joinedOn: fbNow,
        }
        dispatch(saveProfile(p))
        // dispatch({type: LOGIN})
      })
      .catch(error => {
        if (errorHandler) {
          errorHandler(error.message)
        }
      })
  }
}
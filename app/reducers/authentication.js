import { db, firebaseAuth, fbNow } from '~/config/fire'
import { Alert } from 'react-native'
import { getAccessToken, authWithToken, updateUser, signUp, login, logout } from '~/api/auth'
// import { storeProfile } from './profile'
import { NavigationActions } from 'react-navigation'
import DefaultPreference from 'react-native-default-preference'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
const STORE_LAST_EMAIL = 'STORE_LAST_EMAIL'
export const LOGGING_OUT = 'LOGGING_OUT'

function authenticating() {
  return {
    type: AUTHENTICATING,
  }
}

function notAuthed() {
  return {
    type: NOT_AUTHED,
  }
}

function isAuthed(uid) {
  return {
    type: IS_AUTHED,
    uid,
  }
}

function loggingOut() {
  return {
    type: LOGGING_OUT,
  }
}

export function storeLastEmail(email) {
  return {
    type: STORE_LAST_EMAIL,
    email,
  }
}

export function loadUserPrefs() {
  return function(dispatch) {
    DefaultPreference.get('lastEmailUsed')
      .then((email) => {
        if(email !== undefined) {
          dispatch(storeLastEmail(email))
        }
      })
  }
}


function onIsAuthed(uid) {
  return function(dispatch, getState) {
    dispatch(isAuthed(uid))
    const profile = getState().profile
    if(profile.joinedOn !== undefined) {
      dispatch(NavigationActions.navigate({ routeName: 'Home'}))
    } else {
      dispatch(NavigationActions.navigate({ routeName: 'TnC', params: { mustAccept: true }}))
    }
  }
}

export function handleAuthWithFirebase() {
  return function(dispatch, getState) {
    dispatch(authenticating())
    return getAccessToken()
      .then(({accessToken}) => authWithToken(accessToken))
      .catch((error) => Alert.alert('Error with Firebase', error.message))
  }
}

export function fetchProfile(uid, doAuthed = false) {
  return function(dispatch) {
    db.child(`users/${uid}/profile`)
      .once('value', (snapshot) => {
        let profile = snapshot.val()
        // dispatch(storeProfile(fetchUserOppotunities(uid)))
        if(profile !== null) {
          // dispatch(storeProfile(profile))
        }
        if(doAuthed) {
          dispatch(onIsAuthed(uid))
        }
      })
    }
}

export function writeProfile(profile) {
  return function(dispatch) {
    db.child(`users/${profile.uid}/profile`).update(profile)
    dispatch(fetchProfile(profile.uid))
  }
}

export function sendEmailVerification() {
  return function(dispatch) {
    let user = firebaseAuth.currentUser
    if(user) {
      user.sendEmailVerification()
        // .then(() => {},
        // (error) => {}
      // )
    }
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

export function doSignUp(displayName, dob, mobile, email, password, errorHandler) {
  return function(dispatch) {
    signUp(email, password)
      .then((user) => {
        user.updateProfile({displayName})
        const profile = {
          uid: user.uid,
          displayName,
          dob,
          mobile,
          email,
          photoURL: '',
          providerId: user.providerData[0].providerId,
          joinedOn: fbNow,
        }
        dispatch(writeProfile(profile))
      })
      .catch((error) => {
        if(errorHandler)
          errorHandler(error.message)
      })
    }
}

export function doLogin(email, password) {
  return function(dispatch) {
    dispatch(authenticating())
    dispatch(storeLastEmail(email))
    login(email, password)
      .then((user) => {
        const profile = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          providerId: user.providerData[0].providerId,
        }
        DefaultPreference.set('lastEmailUsed', email)
        dispatch(writeProfile(profile))
      })
      .catch((error) => {
        dispatch(notAuthed())
        Alert.alert('Error logging in', error.message)
      })
    }
}

export function userAcceptedTnC() {
  return function(dispatch, getState) {
    const uid = getState().authentication.authedId
    const profile = {
      uid,
      joinedOn: fbNow,
    }
    dispatch(writeProfile(profile))
    dispatch(NavigationActions.navigate({routeName: 'Home'}))
  }
}

export function onAuthChange(user) {
  return function(dispatch) {
    if(!user) {
      dispatch(notAuthed())
    } else {
      dispatch(authenticating())
      const profile = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        providerId: user.providerData[0].providerId
      }
      updateUser(profile)
        .then(() => dispatch(fetchProfile(profile.uid, true)))
    }
  }
}

export function handleUnauth() {
  return function(dispatch) {
    logout()
    dispatch(loggingOut())
  }
}

let initialState = {
  isAuthed: false,
  isAuthenticating: false,
  authedId: '',
  lastEmailUsed: '',
}

export function resetAuthenticationState(state) {
  return {
      ...initialState,
      lastEmailUsed: state.lastEmailUsed,
  }
}

export default function authentication(state=initialState, action) {
  switch(action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: true,
      }

    case NOT_AUTHED:
      return {
        ...state,
        isAuthed: false,
        isAuthenticating: false,
        authedId: '',
      }

    case IS_AUTHED:
      return {
        ...state,
        isAuthed: true,
        isAuthenticating: false,
        authedId: action.uid,
      }

    case STORE_LAST_EMAIL:
      return {
        ...state,
        lastEmailUsed: action.email,
      }

    default:
      return state
  }
}

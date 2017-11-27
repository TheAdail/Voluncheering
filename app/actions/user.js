import { db, fbNow } from '~/config/fire'

export const UPDATE_USER_EVENTS = 'UPDATE_USER_EVENTS'
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'

export function updateUserEvents(events) {
  return {
    type: UPDATE_USER_EVENTS,
    events: events,
  }
}

export function saveProfile(profile) {
  return dispatch => {
    db.child(`users/${profile.uid}/profile`)
      .set(profile)
    dispatch(fetchUserProfile(profile.uid))
  }
}

export function setupProfile(user) {
  return dispatch => {
    db.child(`users/${user.uid}/profile`)
      .once('value', (snapshot) => {
        const profile = snapshot.val()
        if (profile) {
          if(user.providerData[0].providerId !== 'password') {
            const p = {
              ...profile,
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
            }
            dispatch(saveProfile(p))
          } else {
            dispatch({type: UPDATE_USER_PROFILE, profile: profile})
          }
        } else {
          const p = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            providerId: user.providerData[0].providerId,
            joinedOn: fbNow,
          }
          dispatch(saveProfile(p))
        }
      })
  }
}

export function fetchUserProfile(uid) {
  return dispatch => {
    if (uid) {
      db.child(`users/${uid}/profile`)
        .once('value', (snapshot) => {
          const profile = snapshot.val() || {}
          dispatch({type: UPDATE_USER_PROFILE, profile: profile})
      })
    }
  }
}
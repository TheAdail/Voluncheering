import firebase from 'firebase'
import { updateEvents, fetchEvents } from '~/actions/eventList'
import { updateUserEvents, setupProfile } from '~/actions/user'
import {
  logout,
  authDidSucceed,
} from '~/actions/auth'

firebase.initializeApp({
  apiKey: "AIzaSyC97oIiToe-R803x6NtTzTql4fU4t9QNgs",
  authDomain: "voluncheering-c3ae7.firebaseapp.com",
  databaseURL: "https://voluncheering-c3ae7.firebaseio.com",
  projectId: "voluncheering-c3ae7",
  storageBucket: "voluncheering-c3ae7.appspot.com",
  messagingSenderId: "150221963070"
})

export const db = firebase.database().ref()
export const firebaseAuth = firebase.auth()
export const facebookProvider = firebase.auth.FacebookAuthProvider
export const googleProvider = firebase.auth.GoogleAuthProvider
export const fbNow = firebase.database.ServerValue.TIMESTAMP

// Watches firebase auth state and:
// - Trigger authDidSucceed(userId) when the state changes and a user exists
// - Trigger logout() when the state changes and a user does not exists (logout)
export function watchAuthState(store) {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch(authDidSucceed(user.uid))
      store.dispatch(setupProfile(user))
      watchEvents(store)
      watchUserEvents(store, user.uid)
    }
  })
}

// Watch firebase events, format them, and trigger
// updateEvents(events) to update events substate
export function watchEvents(store) {
  // TODO: Only start watchin if use is logged in
  // TODO: Start watching when user log in
  store.dispatch(fetchEvents())
  db.child('events')
    .orderByChild('start')
//    .limitToLast(15)
    .on('value', (snapshot) => {
      const events = snapshot.val() || {}
      const keys = Object.keys(events)

      const evts = keys.map(key => {
        return {
          ...events[key],
          key,
        }
      })

      store.dispatch(updateEvents(evts))
    })
}

// Watch user events joined and resigned, and trigger
// updateUserEvents(events)
export function watchUserEvents(store, uid) {
  db.child(`users/${uid}/events`)
    // .limitToLast(30)
    .on('value', (snapshot) => {
      const events = snapshot.val() || {}
      store.dispatch(updateUserEvents(events))
    })
}
import firebase from 'firebase'
import { updateOpportunities, fetchOpportunities } from '~/actions/opportunityList'
import { updateUserOpportunities, setupProfile } from '~/actions/user'
import {
  logout,
  authDidSucceed,
} from '~/actions/auth'

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
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
      watchOpportunities(store)
      watchUserOpportunities(store, user.uid)
    }
  })
}

// Watch firebase opportunities, format them, and trigger
// updateOpportunities(opportunities) to update opportunities substate
export function watchOpportunities(store) {
  // TODO: Only start watchin if use is logged in
  // TODO: Start watching when user log in
  store.dispatch(fetchOpportunities())
  db.child('opportunities')
    .orderByChild('start')
//    .limitToLast(15)
    .on('value', (snapshot) => {
      const opportunities = snapshot.val() || {}
      const keys = Object.keys(opportunities)

      const opps = keys.map(key => {
        return {
          ...opportunities[key],
          key,
        }
      })

      store.dispatch(updateOpportunities(opps))
    })
}

// Watch user opportunities joined and resigned, and trigger
// updateUserOpportunities(opportunities)
export function watchUserOpportunities(store, uid) {
  db.child(`users/${uid}/opportunities`)
    // .limitToLast(30)
    .on('value', (snapshot) => {
      const opps = snapshot.val() || {}
      store.dispatch(updateUserOpportunities(opps))
    })
}
import { firebaseAuth, facebookProvider, db } from '~/config/fire'
import { AccessToken, LoginManager } from  'react-native-fbsdk'
import { removeEmpty } from '~/config/utils'

// export function getAccessToken() {
//   return AccessToken.getCurrentAccessToken()
// }

// export function authWithToken(accessToken) {
//   return firebaseAuth
//     .signInWithCredential(facebookProvider.credential(accessToken))
// }

export function updateUser(user) {
  const profile = removeEmpty(user)
  return db.child(`users/${user.uid}/profile`).update(profile)
}

// export function logout() {
//   LoginManager.logOut()
//   firebaseAuth.signOut()
//   db.off()
// }

// export function login(email, password) {
//   return firebaseAuth.signInWithEmailAndPassword(email, password)
// }

export function signUp(email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
}
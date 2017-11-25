export const LOGIN_UPDATE_EMAIL = 'LOGIN_UPDATE_EMAIL'
export const LOGIN_UPDATE_PASSWORD = 'LOGIN_UPDATE_PASSWORD'
export const LOGIN_UPDATE_WWCN = 'LOGIN_UPDATE_WWCN'

export function updateEmail(email) {
  return { type: LOGIN_UPDATE_EMAIL, email }
}

export function updatePassword(password) {
  return { type: LOGIN_UPDATE_PASSWORD, password }
}

export function updateWWCN(wwcn){
//   db.child(`users/${profile.uid}/profile`)
//   .set(profile)
// dispatch(fetchUserProfile(profile.uid))
  return { type: LOGIN_UPDATE_WWCN, wwcn }
}
export const LOGIN_UPDATE_EMAIL = 'LOGIN_UPDATE_EMAIL'
export const LOGIN_UPDATE_PASSWORD = 'LOGIN_UPDATE_PASSWORD'

export function updateEmail(email) {
  return { type: LOGIN_UPDATE_EMAIL, email }
}

export function updatePassword(password) {
  return { type: LOGIN_UPDATE_PASSWORD, password }
}
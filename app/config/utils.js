import moment from 'moment'

export function formatDate(date, includeDOW = false, includeYear = false) {
  const dow = includeDOW ? ' ddd' : ''
  const mask = (includeYear ? 'D/MM/YYYY' : 'D/MM') + dow
  return moment(date).format(mask)
}

export function formatDateTime(dateTime, ampm = false, includeDOW = false, includeYear = false) {
  const dow = includeDOW ? ' ddd' : ''
  const timeMask = ampm ? ' h:mma' : ' HH:mm'
  const mask = (includeYear ? 'D/MM/YYYY' : 'D/MM') + timeMask + dow
  return moment(dateTime).format(mask)
}

export function formatTime(dateTime, ampm = false) {
  const mask = ampm ? 'h:mma' : 'HH:mm'
  let result = moment(dateTime).format(mask)
  if(ampm) {
    result = result.replace(':00', '')
  }
  return result
}

export function removeEmpty(obj) {
  return Object.keys(obj)
    .filter(f => obj[f] !== null)
    .reduce((r, i) =>
      typeof obj[i] === 'object' ?
        {...r, [i]: removeEmpty(obj[i]) } :
        {...r, [i]: obj[i]},
      {})
}

// From https://github.com/Sembiance/email-validator

const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

export function validateEmail(email) {
  if(!email)
    return false

  if(email.length > 254)
    return false

  const valid = tester.test(email)
  if(!valid)
    return false

  // Further checking of some things regex can't handle
  const parts = email.split("@")
  if(parts[0].length > 64)
    return false

  var domainParts = parts[1].split(".")
  if(domainParts.some(function(part) { return part.length > 63 }))
    return false

  return true
}
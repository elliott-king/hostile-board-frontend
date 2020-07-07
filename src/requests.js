const API = 'http://localhost:3000/'
const POSITIONS = API + 'positions/'
const APPLICATIONS = API + 'applications/'
const SESSIONS = API + 'sessions/'
const USERS = API + 'users/'
const MESSAGES = API + 'messages/'
const COMPANIES = API + 'companies/'

const defaultGetRequest = async(url) => {
  let res = await fetch(url)
  if (res.status !== 200) {
    console.error(res)
  } else return await res.json()
}

export const getPositions = async() => {
  return await defaultGetRequest(POSITIONS)
}

export const getPosition = async(id) => {
  let url = POSITIONS + id
  return await defaultGetRequest(url)
}

export const createApplication = async(application) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(application)
  }
  let res = await fetch(APPLICATIONS, options)
  if (res.status !== 200) console.error(res)
  else return await res.json()
}

export const createSession = async(userInfo) => {
  let options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userInfo)
  }
  let res = await fetch(SESSIONS, options)
  if (res.status !== 200) console.error(res)
  else return await res.json()
}

export const createUser = async(userInfo) => {
  const {pdf, email, first_name, last_name} = userInfo
  const formData = new FormData()
  formData.append('pdf', pdf)
  formData.append('email', email)
  formData.append('first_name', first_name)
  formData.append('last_name', last_name)
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: formData,
  }
  let res = await fetch(USERS, options)
  if (res.status !== 200) return res
  else return await res.json()
}

export const getUser = async(userId) => {
  let res = await fetch(USERS + userId)
  if (res.status !== 200) return res
  else return await res.json()
}

export const getApplicationsForUser = async(user) => {
  let url = USERS + user.id + '/applications'
  return await defaultGetRequest(url)
}

export const getPositionsForUser = async(user) => {
  let url = USERS + user.id + '/positions'
  return await defaultGetRequest(url)
}

export const getMessagesForUser = async(user) => {
  let url = USERS + user.id + '/messages'
  return await defaultGetRequest(url)
}

export const getMessage = async(id) => {
  let url = MESSAGES + id
  return await defaultGetRequest(url)
}

export const getCompany = async(id) => {
  let url = COMPANIES + id
  return await defaultGetRequest(url)
}

export const getApplication = async(id) => {
  let url = APPLICATIONS + id
  return await defaultGetRequest(url)
}

export const getMessagesForApplication = async(id) => {
  let url = APPLICATIONS + id + '/messages'
  return await defaultGetRequest(url)
}

export const createMessage = async(applicationId, userId, content) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      application_id: applicationId,
      user_id: userId, 
      content: content,
    })
  }
  let res = await fetch(MESSAGES, options)
  if (res.status !== 200) {
    console.error(res)
  } else return await res.json()
}
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
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userInfo)
  }
  let res = await fetch(USERS, options)
  if (res.status !== 200) console.error(res)
  else return await res.json()
}
export const getMessage = async(id) => {
  let url = MESSAGES + id
  return await defaultGetRequest(url)
}

export const getCompany = async(id) => {
  let url = COMPANIES + id
  return await defaultGetRequest(url)
}
}
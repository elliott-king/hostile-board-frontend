const API = 'http://localhost:3000/'
const POSITIONS = API + 'positions/'
const APPLICATIONS = API + 'applications/'
const SESSIONS = API + 'sessions/'
const USERS = API + 'users/'
const MESSAGES = API + 'messages/'
const COMPANIES = API + 'companies/'

export const getPositions = async() => {
  let res = await fetch(POSITIONS)
  if (res.status !== 200) {
    console.error(res)
  } else return await res.json()
}

export const getPosition = async(id) => {
  let url = POSITIONS + id
  let res = await fetch(url)
  if (res.status !== 200) {
    console.error(res)
  } else return await res.json()
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
  let res = await fetch(url)
  if (res.status !== 200) console.error(res)
  else return await res.json()
}

export const getCompany = async(id) => {
  let url = COMPANIES + id
  let res = await fetch(url)
  if (res.status !== 200) console.error(res)
  else return await res.json()
}
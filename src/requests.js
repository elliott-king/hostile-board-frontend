import { fileChecksum } from 'utils/checksum'

// const API = 'https://adversity-backend.herokuapp.com/'
const API = 'http://localhost:3000/'
const POSITIONS = API + 'positions/'
const APPLICATIONS = API + 'applications/'
const SESSIONS = API + 'sessions/'
const USERS = API + 'users/'
const MESSAGES = API + 'messages/'
const COMPANIES = API + 'companies/'
const PRESIGNED_URL = API + 'presigned_url/'

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

const createPresignedUrl = async(file, byte_size, checksum) => {
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: {
        filename: file.name,
        byte_size: byte_size,
        checksum: checksum,
        'content_type': 'application/pdf',
        metadata: {
          "message": "resume for parsing"
        }
      }
    })
  }
  let res = await fetch(PRESIGNED_URL, options)
  if (res.status !== 200) return res
  return await res.json()
}

export const createUser = async(userInfo) => {
  const {pdf, email, first_name, last_name} = userInfo

  // To upload pdf file to S3, we need to do three steps:
  // 1) request a pre-signed PUT request (for S3) from the backend
  // 2) send file to said PUT request (to S3)
  // 3) confirm & create user with backend

  const checksum = await fileChecksum(pdf)
  const presignedFileParams = await createPresignedUrl(pdf, pdf.size, checksum)
  
  const s3PutOptions = {
    method: 'PUT',
    headers: presignedFileParams.direct_upload.headers,
    body: pdf,
  }
  let awsRes = await fetch(presignedFileParams.direct_upload.url, s3PutOptions)
  if (awsRes.status !== 200) return awsRes

  let usersPostOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      first_name: first_name,
      last_name: last_name,
      pdf: presignedFileParams.blob_signed_id,
    })
  }
  let res = await fetch(USERS, usersPostOptions)
  if (res.status !== 200) return res 
  return await res.json()
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
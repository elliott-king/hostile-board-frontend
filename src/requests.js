const API = 'http://localhost:3000/'
const POSITIONS = API + 'positions/'
const APPLICATIONS = API + 'applications/'

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

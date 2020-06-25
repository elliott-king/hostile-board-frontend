const API = 'http://localhost:3000/'
const POSITIONS = API + 'positions/'

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
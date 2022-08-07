import { createContext, useState } from 'react'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const res = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await res.json()
    return data
  }

  const getUsers = async () => {
    const users = await fetchUsers()
    setUsers(users)
    setLoading(false)
  }

  return (
    <GithubContext.Provider value={{ users, loading, getUsers }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider }
export default GithubContext

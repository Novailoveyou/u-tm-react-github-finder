import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

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
    dispatch({
      type: 'GET_USERS',
      payload: users
    })
  }

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, getUsers }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider }
export default GithubContext

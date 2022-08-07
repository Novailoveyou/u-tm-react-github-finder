import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  const searchUsers = async searchTerm => {
    const params = new URLSearchParams({
      q: searchTerm
    })

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const { items } = await res.json()
    return items
  }

  const getUsers = async () => {
    setLoading()
    const users = await searchUsers()
    dispatch({
      type: 'GET_USERS',
      payload: users
    })
  }

  const clearUsers = () =>
    dispatch({
      type: 'CLEAR_USERS'
    })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        getUsers,
        clearUsers
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider }
export default GithubContext

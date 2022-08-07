import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'
import urls from '../../config/urls'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [{ users, user, repos, loading }, dispatch] = useReducer(
    githubReducer,
    initialState
  )

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

  const searchUser = async login => {
    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    if (!res.status === 404) {
      window.location = urls.front.notfound
      return
    }

    const data = await res.json()
    return data
  }

  const getUsers = async searchTerm => {
    setLoading()
    const users = await searchUsers(searchTerm)
    dispatch({
      type: 'GET_USERS',
      payload: users
    })
  }

  const getUser = async login => {
    setLoading()
    const user = await searchUser(login)
    dispatch({
      type: 'GET_USER',
      payload: user
    })
  }

  const fetchRepos = async login => {
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await res.json()
    return data
  }

  const getUserRepos = async login => {
    const repos = await fetchRepos(login)

    dispatch({
      type: 'GET_REPOS',
      payload: repos
    })
  }

  const clearUsers = () =>
    dispatch({
      type: 'CLEAR_USERS'
    })

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        user,
        repos,
        getUsers,
        getUser,
        getUserRepos,
        clearUsers
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider }
export default GithubContext

import axios from 'axios'
import urls from '../../config/urls'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`
  }
})

const fetchUsers = async searchTerm => {
  const params = new URLSearchParams({
    q: searchTerm
  })

  const res = await github.get(`/search/users?${params}`)
  return res.data.items
}

const fetchUser = async login => {
  const res = await github.get(`${GITHUB_URL}/users/${login}`)

  if (res.status === 404) {
    window.location = urls.front.notfound
    return {}
  }

  return res.data
}

const fetchRepos = async login => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })

  const res = await github.get(`${GITHUB_URL}/users/${login}/repos?${params}`)

  return res.data
}

export { fetchUsers, fetchUser, fetchRepos }

import urls from '../../config/urls'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const fetchUsers = async searchTerm => {
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

const fetchUser = async login => {
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

export { fetchUsers, fetchUser, fetchRepos }

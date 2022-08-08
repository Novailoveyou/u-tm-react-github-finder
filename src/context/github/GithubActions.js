const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

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

export { searchUsers }

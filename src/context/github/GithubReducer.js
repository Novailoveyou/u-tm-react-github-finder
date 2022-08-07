const githubReducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_USERS':
      return {
        ...state,
        users: payload,
        loading: false
      }
    case 'GET_USER':
      return {
        ...state,
        user: payload,
        loading: false
      }
    case 'GET_REPOS':
      return {
        ...state,
        repos: payload
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: []
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default githubReducer

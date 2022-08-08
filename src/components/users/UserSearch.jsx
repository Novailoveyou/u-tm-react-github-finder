import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { users, clearUsers, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const handleChange = e => setSearchTerm(e.target.value)
  const handleSubmit = async e => {
    e.preventDefault()

    if (!searchTerm) {
      setAlert('Please enter something', 'error')
      return
    }

    dispatch({ type: 'SET_LOADING' })

    const users = await searchUsers(searchTerm)

    dispatch({
      type: 'GET_USERS',
      payload: users
    })

    setSearchTerm('')
  }
  const handleClick = e => clearUsers()

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <div className='relative'>
            <input
              type='text'
              className='w-full pr-40 bg-gray-200 input input-lg text-black'
              placeholder='Search'
              value={searchTerm}
              onChange={handleChange}
            />
            <button
              type='submit'
              className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>
              Go
            </button>
          </div>
        </div>
      </form>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={handleClick}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch

import { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
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

  useEffect(() => {
    getUsers()
  }, [])

  if (loading) return <Spinner />

  // console.log(users)

  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserResults

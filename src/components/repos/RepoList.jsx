import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../../context/github/GithubContext'
import RepoItem from './RepoItem'

const RepoList = () => {
  const { getUserRepos, repos } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUserRepos(params.login)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Latest Repositories
        </h2>
        {repos.map(repo => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

export default RepoList

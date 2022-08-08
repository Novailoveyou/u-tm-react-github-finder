import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../../context/github/GithubContext'
import { fetchRepos } from '../../context/github/GithubActions'
import RepoItem from './RepoItem'

const RepoList = () => {
  const { repos, dispatch } = useContext(GithubContext)

  const params = useParams()
  const { login } = params

  useEffect(() => {
    const getRepos = async () => {
      const repos = await fetchRepos(login)
      dispatch({ type: 'GET_REPOS', payload: repos })
    }

    getRepos(login)
  }, [dispatch, login])

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

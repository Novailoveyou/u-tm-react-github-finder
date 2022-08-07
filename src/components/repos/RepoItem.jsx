import {
  FaEye,
  FaStar,
  FaInfo,
  FaLink,
  FaStarHalfAlt,
  FaUtensils
} from 'react-icons/fa'
import PropTypes from 'prop-types'

const RepoItem = ({ repo }) => {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count
  } = repo

  const stats = [
    {
      Icon: FaEye,
      value: watchers_count,
      bgColorClassName: 'badge-info'
    },
    {
      Icon: FaStar,
      value: stargazers_count,
      bgColorClassName: 'badge-success'
    },
    {
      Icon: FaInfo,
      value: open_issues,
      bgColorClassName: 'badge-error'
    },
    {
      Icon: FaUtensils,
      value: forks,
      bgColorClassName: 'badge-warning'
    }
  ]

  return (
    <div className='mb-2 rounded-md card bg-gray-800 hover:bg-gray-900'>
      <div className='card-body'>
        <h3 className='mb-2 text-xl font-semibold'>
          <a href={html_url}>
            <FaLink className='inline mr-1' /> {name}
          </a>
        </h3>
        <p className='mb-3'>{description}</p>
        <div>
          {stats.map(({ Icon, value, bgColorClassName }, idx) => (
            <div
              key={`stats__stat-${idx}-${value}`}
              className={`mr-2 badge ${bgColorClassName} badge-lg`}>
              <Icon className='mr-2' /> {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
}

export default RepoItem

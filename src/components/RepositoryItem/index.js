import './index.css'

function RepositoryItem({repositories}) {
  return (
    <div className="cards-container">
      {repositories.map(item => (
        <div key={item.id} className="item-card">
          <img src={item.avatarUrl} alt={item.name} className="url-image" />
          <h1 className="heading">{item.name}</h1>

          <div className="count-direction">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
              className="count-image"
            />
            <p>{item.starsCount} stars</p>
          </div>

          <div className="count-direction">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
              className="count-image"
            />
            <p>{item.forksCount} forks</p>
          </div>

          <div className="count-direction">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
              className="count-image"
            />
            <p>{item.issuesCount} open issues</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RepositoryItem

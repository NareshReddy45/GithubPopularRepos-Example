import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repositories: [],
    activeLanguageId: languageFiltersData[0].id,
    isLoading: false,
    apiFailure: false,
  }

  componentDidMount() {
    this.fetchRepositories()
  }

  fetchRepositories = async () => {
    this.setState({isLoading: true, apiFailure: false})

    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('API Request Failed')
      }
      const data = await response.json()

      const updatedRepositories = data.popular_repos.map(repo => ({
        id: repo.id,
        avatarUrl: repo.avatar_url,
        name: repo.name,
        starsCount: repo.stars_count,
        forksCount: repo.forks_count,
        issuesCount: repo.issues_count,
      }))

      this.setState({repositories: updatedRepositories, isLoading: false})
    } catch (error) {
      this.setState({apiFailure: true, isLoading: false})
    }
  }

  setActiveLanguage = id => {
    this.setState({activeLanguageId: id}, this.fetchRepositories)
  }

  renderContent = () => {
    const {repositories, isLoading, apiFailure} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
      )
    }

    if (apiFailure) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="failure-image"
          />
          <h1 className="failure-heading">Something Went Wrong</h1>
        </div>
      )
    }

    return <RepositoryItem repositories={repositories} />
  }

  render() {
    const {activeLanguageId} = this.state

    return (
      <div className="app-container">
        <h1 className="popular-heading">Popular</h1>
        <LanguageFilterItem
          languageFiltersData={languageFiltersData}
          activeLanguageId={activeLanguageId}
          setActiveLanguage={this.setActiveLanguage}
        />
        {this.renderContent()}
      </div>
    )
  }
}

export default GithubPopularRepos

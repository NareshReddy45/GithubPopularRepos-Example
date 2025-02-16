import './index.css'

const LanguageFilterItem = ({
  languageFiltersData,
  activeLanguageId,
  setActiveLanguage,
}) => (
  <ul className="language-filter-container">
    {languageFiltersData.map(item => (
      <li key={item.id}>
        <button
          type="button"
          className={`language-button ${
            item.id === activeLanguageId ? 'active' : ''
          }`}
          onClick={() => setActiveLanguage(item.id)}
        >
          {item.language}
        </button>
      </li>
    ))}
  </ul>
)

export default LanguageFilterItem

//App-with-Algolia

import AlgoliaSearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const INDEX_NAME = "dictionary"

const algoliaClient = AlgoliaSearch('YWTXGHBI85', '673caa9e2d6e92631f21b254159aa353');
const index = algoliaClient.initIndex(INDEX_NAME)

function App() {

  const onFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const title = formData.get('title')
    const meaning = formData.get('meaning')
    const tags = formData.get('tags')
    const source = formData.get('source')

    index.saveObject({
      title: title,
      meaning: meaning,
      tags: tags.split(','),
      source: source
    }, {
      autoGenerateObjectIDIfNotExist: true
    })

  }

  return (
    <div className="ais-InstantSearch" style={{display: 'flex'}}>
      <h1>Web Development Dictionary</h1>
      <InstantSearch indexName={INDEX_NAME} searchClient={algoliaClient}>
        <div className="left-panel" style={{flex: '80%', marginRight: '20px', marginTop:'20px'}}>
          <SearchBox searchAsYouType defaultRefinement={null} />
          <dl>
            <Hits hitComponent={({ hit }) => {
              return (
                <div style={{
                  marginTop: "1em"
                }}>
                  <dt><b>{hit.title}</b></dt>
                  <dd>{hit.meaning}</dd>

                  <ul style={{ display: 'inline-block', listStyle: 'none', padding: 0 }}>
                    {hit.tags.map(tag => <li style={{ fontSize: 13, color: '#777', width: '150px'}}>{tag}</li>)}
                  </ul>
                </div>
              )
            }} />
          </dl>
        </div>
      </InstantSearch>

      <div className='right-panel' style={{flex: '20%', marginTop:'20px'}}>
        <form onSubmit={onFormSubmit}>
          <p>Enter your Title:</p>
          <input name="title" placeholder='Title' />
          <p>Enter the meaning:</p>
          <input name="meaning" placeholder='Meaning' />
          <p>Enter the tags:</p>
          <input name="tags" placeholder='Tags separated by comma' />
          <p>Enter the source:</p>
          <input name="source" placeholder='Source' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App;




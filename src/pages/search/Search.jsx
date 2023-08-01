import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SearchForm from '../../components/SearchForm/SearchForm'
import SearchResult from '../../components/SearchResult/SearchResult'
import useHttp from '../../hooks/use-http'

const Search = () => {
  const [fetchedMovieData, setFetchedMovieData] = useState([])
  const { sendRequest: fetchMovie, isLoading, error } = useHttp()

  let finalContent = ''

  // update to the final content
  if (isLoading && !error) {
    finalContent = (
      <p style={{ color: 'white', fontSize: '1.75rem', textAlign: 'center' }}>
        Loading...
      </p>
    )
  }

  // update to the final content
  if (!isLoading && error) {
    finalContent = (
      <p style={{ color: 'white', fontSize: '1.75rem', textAlign: 'center' }}>
        {error}
      </p>
    )
  }

  // update to the final content
  if (!isLoading && !error && fetchedMovieData.length !== 0) {
    finalContent = <SearchResult movieData={fetchedMovieData} />
  }

  return (
    <div className="app">
      <NavBar />
      <SearchForm
        onSearch={fetchMovie}
        setFetchedMovieData={setFetchedMovieData}
      />
      {finalContent}
    </div>
  )
}

export default Search

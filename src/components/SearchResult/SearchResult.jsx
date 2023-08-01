import React, { Fragment, useMemo, useRef, useState } from 'react'
import classes from './SearchResult.module.css'
import MovieDetail from '../MovieList/MovieDetail'

const SearchResult = ({ movieData }) => {
  const [selectedMovie, setSelectedMovie] = useState({})
  const [showMovieDetail, setShowMovieDetail] = useState(false)
  const [activeRow, setActiveRow] = useState(null)
  const searchResultRef = useRef()

  const showMovieDetailHandle = (movie, rowIndex, event) => {
    const activeImg = event.target

    setSelectedMovie(movie)
    setActiveRow(rowIndex)

    // if the img you've clicked is the same as the previous one, hide MovieDetail and set img to inactive
    if (activeImg.classList.contains(classes.active)) {
      activeImg.classList.remove(classes.active)
      setShowMovieDetail(false)
      return
    } else {
      activeImg.classList.add(classes.active)
      setShowMovieDetail(true)
    }

    // to make sure that there is only an image in the 'active' state
    for (const currentImg of searchResultRef.current.getElementsByTagName(
      'img'
    )) {
      if (
        currentImg.classList.contains(classes.active) &&
        currentImg !== activeImg
      ) {
        currentImg.classList.remove(classes.active)
        break
      }
    }
  }

  // return an array containing whole movieData that separates into "n" sub-components with respect to "n" rows.
  // numberMoviePerRow equal to number of grid-colum
  const renderSearchContent = (numberMoviePerRow = 9) => {
    // number of rows
    const rowCount = Math.ceil(movieData.length / numberMoviePerRow)

    const searchResultContent = []

    for (let i = 0; i < rowCount; i++) {
      const currentRow = i

      const start = currentRow * numberMoviePerRow
      const end = start + numberMoviePerRow

      const movieListPerRowData = movieData.slice(start, end)

      const movieListPerRow = movieListPerRowData.map(movie => (
        <a href="#movie-detail" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie['poster_path']}`}
            alt="the firm's poster"
            onClick={showMovieDetailHandle.bind(null, movie, i)}
            onError={e => e.target.remove()}
          />
        </a>
      ))

      // update to the returned array
      searchResultContent.push(
        <Fragment key={i}>
          <div className={classes.row}>{movieListPerRow}</div>
          {showMovieDetail && activeRow === currentRow && (
            <MovieDetail selectedMovie={selectedMovie} id="movie-detail" />
          )}
        </Fragment>
      )
    }

    return searchResultContent
  }

  return (
    <div className={classes.container} ref={searchResultRef}>
      <h2 className={classes.category}>Search Result</h2>
      {renderSearchContent()}
    </div>
  )
}

export default SearchResult

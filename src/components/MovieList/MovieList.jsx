import React, { useEffect, useMemo, useState, useRef } from 'react'
import classes from './MovieList.module.css'
import useHttp from '../../hooks/use-http'
import MovieDetail from './MovieDetail.jsx'

const MovieList = ({ fetchUrl, movieCategory, imgPath = 'backdrop_path' }) => {
  const { sendRequest: fetchMovies } = useHttp()
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState([])
  const [showMovieDetail, setShowMovieDetail] = useState(false)
  const imgListContainer = useRef()

  // fetch movie's data follow movie's type that we want
  useEffect(() => {
    fetchMovies({ url: fetchUrl }, data => {
      setMovies(data.results)
    })
  }, [fetchUrl])

  const showInformationHandle = (movie, event) => {
    const activeImg = event.target

    setSelectedMovie(movie)

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
    for (const currentImg of imgListContainer.current.getElementsByTagName(
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

  const imageList = useMemo(
    () =>
      movies.map(movie => (
        <a href={`#${movieCategory}`} key={movie.id}>
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original${movie[imgPath]}`}
            alt="the firm's poster"
            onClick={showInformationHandle.bind(null, movie)}
            onError={e => {
              e.target.parentNode.remove()
            }}
          />
        </a>
      )),
    [movies]
  )

  return (
    <div className={`${classes.container} ${classes[imgPath]}`}>
      <h2 className={classes.category}>{movieCategory}</h2>
      <div className={classes.imgList} ref={imgListContainer}>
        {imageList}
      </div>
      {showMovieDetail && (
        <MovieDetail selectedMovie={selectedMovie} id={movieCategory} />
      )}
    </div>
  )
}

export default MovieList

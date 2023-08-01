import React, { useContext, useEffect, useState } from 'react'
import classes from './Banner.module.css'
import requests from '../../store/request context'
import useHttp from '../../hooks/use-http'

const Banner = () => {
  const { fetchNetflixOriginals } = useContext(requests)
  const { sendRequest: fetchMovies } = useHttp()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    fetchMovies({ url: fetchNetflixOriginals }, data => {
      setMovie(data.results[Math.floor(Math.random() * data.results.length)])
    })
  }, [fetchNetflixOriginals])

  // setup background-image follow a random movie
  useEffect(() => {
    const banner = document.querySelector(`.${classes.banner}`)

    banner.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${
      movie[`backdrop_path`]
    }')`
  }, [movie])

  return (
    <section className={classes.banner}>
      <h1>{movie.name}</h1>
      <div className={classes.actions}>
        <button>Play</button>
        <button>My List</button>
      </div>
      <p>{movie.overview}</p>
    </section>
  )
}

export default Banner

import React, { useContext, useEffect, useState } from 'react'
import classes from './MovieDetail.module.css'
import requests from '../../store/request context'
import YouTube from 'react-youtube'
import useHttp from '../../hooks/use-http'

const MovieDetail = ({ selectedMovie, id }) => {
  const { api_key } = useContext(requests)
  const [youtubeId, setYoutubeId] = useState('')
  const { sendRequest: fetchVideoData } = useHttp()

  // fetch video's data of the selected movie. Then, extract Youtube video's id and save it
  useEffect(() => {
    fetchVideoData(
      {
        url: `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${api_key}`,
      },
      data => {
        const validData = data.results.filter(
          item =>
            item.site === 'YouTube' &&
            (item.type === 'Trailer' || item.type === 'Teaser')
        )

        if (validData.length === 0) {
          setYoutubeId('')
          return
        }

        // to prioritize trailer over teaser video
        const youtubeId =
          validData[
            validData.findIndex(
              item => item.type === 'Trailer' || item.type === 'Teaser'
            )
          ].key

        setYoutubeId(youtubeId)
      }
    )
  }, [selectedMovie])

  let hasVideo = true
  if (youtubeId === '') hasVideo = false

  return (
    <div className={classes.container} id={id}>
      <div className={classes.information}>
        <h1>{selectedMovie.title || selectedMovie[`original_name`]}</h1>
        <hr />
        <p className={classes.date}>
          <strong>
            Release Date:{' '}
            {selectedMovie[`release_date`] || selectedMovie[`first_air_date`]}
          </strong>
        </p>
        <p className={classes.vote}>
          <strong>Vote: {selectedMovie[`vote_average`]} / 10</strong>
        </p>
        <p className={classes.overview}>{selectedMovie.overview}</p>
      </div>
      {hasVideo && (
        <YouTube
          videoId={youtubeId}
          opts={{
            height: '400px',
            width: '100%',
          }}
        />
      )}
      {!hasVideo && (
        <img
          src={`https://image.tmdb.org/t/p/original${
            selectedMovie[`backdrop_path`]
          }`}
          alt="the firm's poster"
        />
      )}
    </div>
  )
}

export default MovieDetail

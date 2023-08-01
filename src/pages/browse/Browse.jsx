import React, { useContext } from 'react'
import NavBar from '../../components/NavBar/NavBar.jsx'
import Banner from '../../components/Banner/Banner.jsx'
import MovieList from '../../components/MovieList/MovieList.jsx'
import requests from '../../store/request context'

function Browse() {
  const requestContext = useContext(requests)

  return (
    <div className="app">
      <NavBar />
      <Banner />
      <section className="list_movie_types">
        <MovieList
          fetchUrl={requestContext.fetchNetflixOriginals}
          imgPath="poster_path"
        />
        <MovieList
          fetchUrl={requestContext.fetchTrending}
          movieCategory={`Xu hướng`}
        />
        <MovieList
          fetchUrl={requestContext.fetchTopRated}
          movieCategory={`Xếp hạng cao`}
        />
        <MovieList
          fetchUrl={requestContext.fetchActionMovies}
          movieCategory={`Hành động`}
        />
        <MovieList
          fetchUrl={requestContext.fetchComedyMovies}
          movieCategory={`Hài`}
        />
        <MovieList
          fetchUrl={requestContext.fetchHorrorMovies}
          movieCategory={`Kinh dị`}
        />
        <MovieList
          fetchUrl={requestContext.fetchRomanceMovies}
          movieCategory={`Lãng mạn`}
        />
        <MovieList
          fetchUrl={requestContext.fetchDocumentaries}
          movieCategory={`Tài liệu`}
        />
      </section>
    </div>
  )
}

export default Browse

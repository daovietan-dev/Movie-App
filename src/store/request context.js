import { createContext } from 'react'

const api_key = '710a79fdd96f8e28bd8de78e1fdcd539'
const api_root = 'https://api.themoviedb.org/3'

const requests = createContext({
  fetchTrending: `${api_root}/trending/all/week?api_key=${api_key}&language=en-US`,
  fetchNetflixOriginals: `${api_root}/discover/tv?api_key=${api_key}&with_network=123`,
  fetchTopRated: `${api_root}/movie/top_rated?api_key=${api_key}&language=en-US`,
  fetchActionMovies: `${api_root}/discover/movie?api_key=${api_key}&with_genres=28`,
  fetchComedyMovies: `${api_root}/discover/movie?api_key=${api_key}&with_genres=35`,
  fetchHorrorMovies: `${api_root}/discover/movie?api_key=${api_key}&with_genres=27`,
  fetchRomanceMovies: `${api_root}/discover/movie?api_key=${api_key}&with_genres=10749`,
  fetchDocumentaries: `${api_root}/discover/movie?api_key=${api_key}&with_genres=99`,
  fetchSearch: `${api_root}/search/movie?api_key=${api_key}&language=en-US`,
  api_key,
})

export default requests

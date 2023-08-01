import React, { useContext, useState } from 'react'
import classes from './SearchForm.module.css'
import requests from '../../store/request context'

const SearchForm = ({ onSearch: fetchMovie, setFetchedMovieData }) => {
  const [inputValue, setInputValue] = useState('')
  const { fetchSearch } = useContext(requests)

  const submitHandle = event => {
    event.preventDefault()

    fetchMovie({ url: `${fetchSearch}&query=${inputValue.trim()}` }, data => {
      setFetchedMovieData(data.results)
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandle}>
      <div className={classes.control}>
        <input
          type="text"
          placeholder="Search movie here!"
          id="name"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <label htmlFor="name">
          <i
            className={`fa-sharp fa-solid fa-magnifying-glass ${classes.icon}`}
          ></i>
        </label>
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes.resetBtn}
          onClick={() => setInputValue('')}
        >
          RESET
        </button>
        <button className={classes.searchBtn}>SEARCH</button>
      </div>
    </form>
  )
}

export default SearchForm

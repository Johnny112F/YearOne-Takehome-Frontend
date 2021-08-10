import { getAllByLabelText } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '../Alert';
import SearchForm from '../SearchForm';

const BASE_URL = "http://localhost:5000";

function MoviesList() {
  const [data, setData] = useState({ movies: [], totalPages: 0, totalResults: 0, searchedTerm: "" });
}

const apiSearch = async(term, page = 1) => {
  let res = await fetch(`${BASE_URL}/movies/search=spiderman`)
  let searchResults =  await res.json();
  return searchResults;
}

export default MoviesList;
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '../Alert';
import MoviesList from '../MoviesList';
import SearchForm from '../SearchForm';
import PageChangeDropDown from '../PageChangeDropDown/PageChangeDropDown';
import './style.css'

/**
 * MovieListPage displays the SearchForm, MovieList, Alerts (if any).
 * 
 * responsible for handling the fetch requests to the backend: 
 *   - searchApi(term, page) pings the GET `/movies/search` endpoint.
 */
function Home() {
  const [data, setData] = useState({ movies: [], totalPages: 0, totalResults: 0, searchedTerm: "" });
  const [alerts, setAlerts] = useState([]);
  const history = useHistory();


  // obtain the query values.
  const search = window.location.search;
  let params = new URLSearchParams(search);
  const searchedTerm = params.get('term');
  const currPage = params.get('page');


  // useEffect is used to ensure when the user presses Back on history, the correct movies will show
  // for the correct search/page queries.
  useEffect(function handleGetMovies() {
    async function getMovies(searchTerm, page) {
      await searchApi(searchTerm, page)
    }
    // if the queries exist, then make sure to fetch the movies for the correct search term and page.
    if (searchedTerm && currPage) {
      getMovies(searchedTerm, currPage);
    }
  }, []);

  // ping the backend API to search for movies given a `term` and optional `page`.
  const searchApi = async (term, page = 1) => {
    setAlerts("");
    try {
      let res = await fetch(`/movies/search?term=${term}&page=${page}`);
      let movieResults = await res.json();
      if (movieResults.errors) {
        setAlerts(movieResults.errors);
      } else {
        setData({ movies: movieResults.results, totalPages: movieResults.total_pages, totalResults: movieResults.total_results, searchedTerm: term });
        if (movieResults.results.length === 0) {
          setAlerts(["No movies found! :("])
        }
      }
    } catch (err) {
      setAlerts(["Server offline: Refused to connect."]);
    }
  }

  // page change will ping the API to get the next page's movie results.
  const handlePageChange = async (evt) => {
    const { value } = evt.target;
    await searchApi(data.searchedTerm, value);
    // change the URL to be the new `page` value.
    history.push(`/search?term=${data.searchedTerm}&page=${value}`)
  }

  // generates an array of number for total pages from the search results.
  const pageNumbers = [];
  for (let i = 1; i <= data.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <p className="HomePage-about">An Application For Finding and Rating Films </p>
        <h1><span>YearOne</span>MovieRatings</h1>
        <p className="HomePage-credits">API by TMDB</p>
      </header>
      <SearchForm searchApi={searchApi} setAlerts={setAlerts} />
      <section className="HomePage-pages-container">
        {pageNumbers.length !== 0 &&
          <PageChangeDropDown handlePageChange={handlePageChange} pageNumbers={pageNumbers} />
        }
        {alerts.length !== 0 && alerts.map(alert => <Alert id="Red-Text" key={alert} alert={alert} />)}
        {data.totalResults !== 0 && <p className="HomePage-ttl-results">{data.totalResults} movies found!</p>}
      </section>
      <MoviesList movies={data.movies} />
    </div>
  );
}

export default Home;
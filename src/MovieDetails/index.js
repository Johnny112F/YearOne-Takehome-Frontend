import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingTable from '../RatingTable';
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import './style.css'

/**
 * MovieDetails renders a movie's details, form for rating a movie, 
 * and the RatingTable component.
 * 
 * Handles contact to backend API:
 *    - fetchDetails() pings the GET `/movies/:id` endpoint.
 *    - handleRating() pings the POST `/movies/:id/rate` endpoint.
 */

function MovieDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();

  // fetches the movie detail data upon mounting.
  useEffect(function handleFetchDetails() {
    async function fetchDetails() {
      let response = await fetch(`/movies/${id}`);
      let movieDetails = await response.json();
      let { title,
        director,
        release_year: releaseYear,
        description,
        poster_path: posterPath,
        thumbs_down: thumbsDown,
        thumbs_up: thumbsUp
      } = movieDetails;
      // make a copy of previous data object and put new data in.
      setData({
        ...movieDetails,
        title,
        releaseYear,
        description,
        director,
        thumbsUp,
        thumbsDown,
        posterPath
      });
    }
    fetchDetails();
  }, [id]);

  // pings backend api to register a rating submission for the movie.
  const handleRating = async (evt) => {
    evt.preventDefault();
    const { value } = evt.target;
    // variable to store options necessary for POST request.
    const requestOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "rating": value, "title": data.title })
    };
    let response = await fetch(`/movies/${id}/rate`, requestOptions);
    let ratings = await response.json();
    setData(currVal => ({
      ...currVal,
      ...ratings
    }));
  }

  return (
    <div className="MovieDetails">
      {data &&
        <>
          <header className="MovieDetails-title">
            <h1>{data.title}</h1>
            {data.original_title && <span>(Alt: {data.original_title})</span>}
          </header>
          <section className="MovieDetails-details">
            <img src={data.posterPath
              ? `https://image.tmdb.org/t/p/original${data.posterPath}`
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png'} alt={data.title} />
            <div className="MovieDetails-description-container">
              <h4>Director: </h4>
              <p>{data.director
                ? data.director
                : "No director found."}
              </p>
              <h4>Release Year:</h4>
              <p>{data.release_year
                ? data.releaseYear
                : "No release year found."}
              </p>
              <h4>Description</h4>
              <p>{data.description
                ? data.description
                : "No description found."}
              </p>
            </div>
          </section>
          <p className="MovieDetails-rating-title">Please leave a review below...</p>
          <RatingTable thumbs_up={data.thumbs_up} thumbs_down={data.thumbs_down} />
          <form>
            <button className="MovieDetails-up" value="1" onClick={handleRating}><FaThumbsUp /></button>
            <i className="fas fa-thumbs-up"></i>
            <button className="MovieDetails-down" value="0" onClick={handleRating}><FaThumbsDown /></button>
          </form>
        </>
      }
    </div>
  );
}

export default MovieDetails;
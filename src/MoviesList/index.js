import MovieCard from '../MovieCard';
import './style.css'

/**
 * Given an Array 'movies', render <li> for each movie. 
 * 
 * @param {Object[]} movies
 * @param {Object} movies[]
 */
function MoviesList({ movies }) {
  return (
    <ul className="MoviesList">
      {movies.length > 0 && movies.map(m => {
        return <MovieCard key={m.id} id={m.id} title={m.title} posterPath={m.poster_path}/>
      })}
    </ul>
  );
}

export default MoviesList;
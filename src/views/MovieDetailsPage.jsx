import { useEffect, useState, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  NavLink,
  useParams,
  useNavigate,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as apiService from '../services/apiService';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    apiService.getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  // const base_img_url = 'https://image.tmdb.org/t/p/w342/';
  return (
    <>
      <button type="button" onClick={() => navigate('/', { replace: true })}>
        Go back
      </button>
      {movie && (
        <div>
          <div>
            {/* <img
              src={`${base_img_url}${movie.poster_path}`}
              alt={movie.title}
              height="300"
              width="250"
            ></img> */}
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
              }
              alt={movie.title}
              height="320"
              width="250"
            />
          </div>
          <div>
            <div>
              <h1>
                {movie.title || movie.name}({movie.release_date.slice(0, 4)})
              </h1>
              <h3>Rating {movie.vote_average}</h3>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(el => (
                  <li key={el.id}> {el.name}</li>
                ))}
              </ul>
              <p>Additional information</p>
              <div className="container">
                <NavLink to="cast">Cast</NavLink>
                <NavLink to="reviews">Reviews</NavLink>
                <Suspense
                  fallback={
                    <>
                      <Loader
                        type="Hearts"
                        color="#FFC0CB"
                        height={80}
                        width={80}
                      />
                    </>
                  }
                >
                  <Routes>
                    <Route path="cast" element={<Cast movieId={movieId} />} />
                    <Route path="reviews" element={<Reviews />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

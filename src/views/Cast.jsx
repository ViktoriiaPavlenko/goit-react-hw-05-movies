import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as apiService from '../services/apiService';

export default function Cast({ movieId }) {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    apiService
      .getMovieCredits(movieId)
      .then(credits => setCredits(credits.cast));
  }, [movieId]);

  return (
    <ul id="cast">
      {credits &&
        credits.map(credit => (
          <li key={credit.id}>
            <img
              src={
                credit.profile_path
                  ? `https://image.tmdb.org/t/p/w300${credit.profile_path}`
                  : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
              }
              alt={credit.original_name}
            />
            <div>
              <p>{credit.original_name}</p>
              <p>Character: {credit.character}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string,
};

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as apiService from '../services/apiService';

export default function HomePage() {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    apiService.getTrending().then(response => {
      setTrends(response.results);
    });
  }, []);

  // const imgUrl = 'https://image.tmdb.org/t/p/w342/';

  return (
    <>
      <h1>Trending today</h1>
      {trends && (
        <ul>
          {trends.map(item => (
            <li key={item.id}>
              <NavLink to={`movies/${item.id}`}>
                <h2>{item.title || item.name}</h2>
                {/* <img src={`${imgUrl}${item.poster_path}`} alt={item.title} /> */}
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : 'https://pomogaetsrazu.ru/images/offers/2829219234.jpg'
                  }
                  alt={item.title}
                />
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

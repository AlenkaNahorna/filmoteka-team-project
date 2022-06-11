import { Notify } from 'notiflix';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api.js';

const getGenres = async () =>
  await axios
    .get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch(e => console.error(e));

function createYear(obj) {
  return obj.release_date ? obj.release_date.split('-')[0] : '';
}

const allGenres = getGenres();

function genres() {
  const { genres } = allGenres;
  return genres;
}

function createGenresFromTrend(array, allGenres) {
  return array
    .map(id =>
      allGenres.filter(element => {
        if (element.id === id) {
          return element.name;
        }
      })
    )
    .slice(0, 3)
    .flat();
}

function dataCombine(films, allGenres) {
  return films.map(film => ({
    ...film,
    year: createYear(film),
    genres: createGenresFromTrend(film.genre_ids, allGenres),
  }));
}


const customAxiosGenres = axios.create({
  baseURL: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
});

const getGenres = async () => {
  try {
    const { data } = await customAxiosGenres.get();
    return data;
  } catch {
    Notify.failure(
      'Search result not successful. Enter the correct movie name and  try again'
    );
  }
};

export {
  dataCombine,
  createGenresFromTrend,
  createYear,
  getGenres,
  allGenres,
  genres,
};

export const getFormProps = (
  isMovies,
  state,
  getFormElementsList,
  formElementSelectOptions,
  getFormCheckbox,
) => {
  const selectedValue = isMovies
    ? { ...state, watched: !!state.watched, rate: +state.rate }
    : { ...state, age: +state.age };
  const formElementsListParams = isMovies
    ? [
        state.name,
        state.genre,
        state.rate,
        { directorId: state.directorId, directors: formElementSelectOptions },
      ]
    : [state.name, state.age];
  const formElementsList = getFormElementsList(...formElementsListParams);
  const formCheckbox = isMovies ? getFormCheckbox?.(state.watched) : null;

  return { selectedValue, formElementsList, formCheckbox };
};

export const getDirectorsFormElementsList = (name, age) => [
  { id: 'outlined-name', label: 'Name', name: 'name', required: true, value: name },
  { id: 'outlined-rate', label: 'Age', name: 'age', required: true, type: 'number', value: age },
];

export const getMoviesFormElementsList = (movieName, genre, rate, { directorId, directors }) => [
  { id: 'outlined-name', label: 'Name', name: 'name', required: true, value: movieName },
  { id: 'outlined-genre', label: 'Genre', name: 'genre', required: true, value: genre },
  {
    id: 'outlined-rate',
    label: 'Rate',
    name: 'rate',
    required: false,
    type: 'number',
    value: rate,
  },
  {
    id: 'outlined-director',
    label: 'Director',
    name: 'directorId',
    required: true,
    value: directorId,
    options: directors,
  },
];

export const getMoviesFormCheckbox = checked => ({
  checked,
  name: 'watched',
  value: 'watched',
  label: 'Watched movie',
  required: false,
});

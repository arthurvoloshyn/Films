export const moviesTableHeadList = [
  { title: 'Name' },
  { title: 'Genre' },
  { title: 'Watched' },
  { title: 'Rate', align: 'right' },
  { title: 'Director' },
  { align: 'right' },
];

export const moviesFormElementsList = (movieName, genre, rate, { directorId, directors }) => [
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

export const moviesFormCheckbox = checked => ({
  checked,
  name: 'watched',
  value: 'watched',
  label: 'Watched movie',
  required: false,
});

export const moviesInitState = {
  id: null,
  open: false,
  name: '',
  genre: '',
  watched: false,
  rate: 0,
  directorId: '',
};

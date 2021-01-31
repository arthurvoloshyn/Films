export const moviesTableHeadList = [
  { title: 'Name' },
  { title: 'Genre' },
  { title: 'Rate', align: 'right' },
  { title: 'Director' },
  { title: 'Watched' },
  { align: 'right' },
];

export const moviesFormTextFieldsList = (movieName, genre, rate) => [
  { id: 'outlined-name', label: 'Name', name: 'name', required: true, value: movieName },
  { id: 'outlined-genre', label: 'Genre', name: 'genre', required: true, value: genre },
  { id: 'outlined-rate', label: 'Rate', name: 'rate', required: false, value: rate },
];

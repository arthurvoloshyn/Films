export const moviesTableHeadList = [
  { title: 'Name' },
  { title: 'Genre' },
  { title: 'Watched' },
  { title: 'Rate', align: 'right' },
  { title: 'Director' },
  { align: 'right' },
];

export const moviesInitState = {
  id: null,
  open: false,
  name: '',
  genre: '',
  watched: false,
  rate: 0,
  directorId: '',
};

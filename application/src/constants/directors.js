export const directorsTableHeadList = [
  { title: 'Name' },
  { title: 'Age', align: 'right' },
  { title: 'Movies' },
  { align: 'left' },
];

export const directorsFormElementsList = (name, age) => [
  { id: 'outlined-name', label: 'Name', name: 'name', required: true, value: name },
  { id: 'outlined-rate', label: 'Age', name: 'age', required: true, value: age },
];

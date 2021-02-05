// eslint-disable-next-line import/prefer-default-export
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

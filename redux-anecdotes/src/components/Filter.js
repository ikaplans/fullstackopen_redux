import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/anecdoteReducer.js';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => {
    return state.filter;
  });
  const onFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      filter{' '}
      <input id="filter" type="text" onChange={onFilterChange} value={filter} />
    </div>
  );
};

export default Filter;

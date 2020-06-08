import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/anecdoteReducer.js';

const Filter = (props) => {
  const onFilterChange = (event) => {
    props.setFilter(event.target.value);
  };

  return (
    <div>
      filter{' '}
      <input
        id="filter"
        type="text"
        onChange={onFilterChange}
        value={props.filter}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { filter: state.filter };
};

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

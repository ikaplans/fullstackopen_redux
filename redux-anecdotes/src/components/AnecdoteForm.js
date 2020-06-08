import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer.js';

const AnecdoteForm = (props) => {
  const onFormSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.addAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addAnecdote,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);

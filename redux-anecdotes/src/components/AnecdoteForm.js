import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addAnecdote,
  setNotification,
  clearNotification,
} from '../reducers/anecdoteReducer.js';
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const onFormSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addAnecdote(content));
    dispatch(setNotification(`Anecdote added: ${content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
export default AnecdoteForm;

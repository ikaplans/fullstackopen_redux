import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  voteForAnecdote,
  setNotification,
  clearNotification,
} from '../reducers/anecdoteReducer.js';
const AnecdoteList = () => {
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id));
    dispatch(setNotification(`you voted for ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
  const anecdotes = useSelector((state) => {
    return state.filter
      ? state.anecdotes.filter((an) => an.content.includes(state.filter)) || []
      : state.anecdotes;
  });
  return anecdotes
    .sort((one, two) => two.votes - one.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ));
};
export default AnecdoteList;

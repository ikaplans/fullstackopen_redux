import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer.js';
const AnecdoteList = () => {
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
  };
  const anecdotes = useSelector((state) => {
    return state.filter
      ? state.anecdotes.filter((an) => an.content.includes(state.filter)) || []
      : state.anecdotes;
  });
  return !anecdotes || anecdotes.length === 0
    ? null
    : anecdotes
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

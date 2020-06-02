import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer.js';
const AnecdoteList = () => {
  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  return anecdotes
    .sort((one, two) => two.votes - one.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};
export default AnecdoteList;

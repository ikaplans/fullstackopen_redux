import React from 'react';
import { connect } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer.js';
const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteForAnecdote(anecdote);
  };

  return !props.anecdotes || props.anecdotes.length === 0
    ? null
    : props.anecdotes
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.filter
      ? state.anecdotes.filter((an) => an.content.includes(state.filter)) || []
      : state.anecdotes,
  };
};

const mapDispatchToProps = {
  voteForAnecdote,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

import { combineReducers } from 'redux';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialStateAnecdotes = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialStateAnecdotes, action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      return state.map((an) => {
        return an.id === action.data.id ? { ...an, votes: an.votes + 1 } : an;
      });
    case 'ADD':
      return state.concat(asObject(action.data));
    default:
      return state;
  }
};

const notificationReducer = (state = null, action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

const filterReducer = (state = '', action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: anecdote,
  };
};

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: notification,
  };
};

export const clearNotification = (notification) => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter,
  };
};

export default reducer;

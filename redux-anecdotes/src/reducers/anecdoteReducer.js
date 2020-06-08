import { combineReducers } from 'redux';
import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'UPDATE':
      return state.map((an) => {
        return an.id === action.data.id ? action.data : an;
      });
    case 'ADD':
      return state.concat(action.data);
    case 'INIT':
      return action.data;
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

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(setNotification(`you voted for ${savedAnecdote.content}`, 5));
    dispatch({
      type: 'UPDATE',
      data: savedAnecdote,
    });
  };
};

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(setNotification(`Anecdote added: ${anecdote}`, 5));
    return dispatch({
      type: 'ADD',
      data: savedAnecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    return dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

export const setNotification = (notification, timeout) => {
  return function (dispatch, getState) {
    const state = getState();
    if (state.notification && state.notification.timeoutId) {
      clearTimeout(state.notification.timeoutId);
    }
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { content: notification, timeoutId },
    });
  };
};

export const clearNotification = () => {
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

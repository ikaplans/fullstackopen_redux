import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const onGoodClick = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };
  const onNeutralClick = () => {
    store.dispatch({
      type: 'OK',
    });
  };
  const onBadClick = () => {
    store.dispatch({
      type: 'BAD',
    });
  };
  const onResetClick = () => {
    store.dispatch({
      type: 'ZERO',
    });
  };

  return (
    <div>
      <button onClick={onGoodClick}>good</button>
      <button onClick={onNeutralClick}>neutral</button>
      <button onClick={onBadClick}>bad</button>
      <button onClick={onResetClick}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

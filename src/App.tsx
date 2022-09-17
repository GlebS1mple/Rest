import React from 'react';
import Header from './components/Header/Header';
import s from './App.module.css'
import Main from './components/Main/Main';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className={s.App}>
        <Header />
        <Main />
      </div>
    </Provider>
  );
}

export default App;

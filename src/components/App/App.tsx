import React from 'react';
import Header from '../Header/Header';
import s from './App.module.css'
import Main from '../Main/Main';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const App: React.FC = () => {
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

import React from 'react';
import Header from '../Header/Header';
import s from './App.module.css'
import Main from '../Main/Main';
import { Provider } from 'react-redux';
import store, { AppStateType } from '../../redux/store';
import MainPage from '../MainPage/MainPage';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import RestaurantPage from '../RestaurantPage/RestaurantPage';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={s.App}>
          <Routes>
            <Route path='main/' element={<MainPage />} />
            <Route index element={<MainPage />} />
            <Route path='/restaurant' element={<RestaurantPage />} />
            <Route path='*' element={<div>404 NOT FOUND</div>} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

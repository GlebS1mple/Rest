import React from 'react';
import Header from './../Header/Header';
import Main from './../Main/Main';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/mainReducer';

const MainPage = () => {
    let dispatch = useDispatch()
    const setActive = (isPopUpActive: boolean) => {
        dispatch(actions.isPopUpActiveAC(isPopUpActive))
    }
    return (
        <div onClick={() => { setActive(false) }}>
            <Header />
            <Main />
        </div>
    );
};

export default MainPage;
import React from 'react'
import Map from './Map/Map'
import s from '../Main/Main.module.css'
import AboutRestaurants from './AboutRestaurants/AboutRestaurants'
import { useEffect } from 'react'
import { actions, getRestaurantsThunk, searchRestaurantsThunk } from '../../redux/mainReducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { SortType } from '../../types/types'


const Main: React.FC = () => {
    const isList = useSelector<AppStateType, boolean>(state => state.main.isList)
    const priceLevel = useSelector<AppStateType, string>(state => state.main.priceLevel)
    const isClosed = useSelector<AppStateType, boolean | null>(state => state.main.isClosed)
    const location = useSelector<AppStateType, string>(state => state.main.location)
    const term = useSelector<AppStateType, string>(state => state.main.term)
    const sortBy = useSelector<AppStateType, SortType>(state => state.main.sortBy)
    let dispatch = useDispatch()
    const clickHandler = (isList: boolean) => {
        dispatch(actions.isListAC(isList))
    }
    useEffect(() => {
        //@ts-ignore
        dispatch((searchRestaurantsThunk(term, location, priceLevel, isClosed, sortBy)))
    }, [])
    useEffect(() => {
        //@ts-ignore
        dispatch((searchRestaurantsThunk(term, location, priceLevel, isClosed, sortBy)))
    }, [term, location, priceLevel, isClosed, sortBy])
    return (
        <div className={isList ? `${s.main}` : `${s.mainActive}`}>
            <AboutRestaurants />
            <div className={s.sticky}>
                <Map />
                <button onClick={() => { clickHandler(true) }} className={isList ? `${s.btn}` : `${s.btnActive}`}>List</button>
            </div>
        </div>
    );
};

export default Main;
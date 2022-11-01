import React, { useState } from 'react'
import s from './Header.module.css'
import logo from '../../../src/img/Logo.png'
import searchPhoto from '../../..//src/img/search.png'
import { useDispatch } from 'react-redux'
import { actions } from './../../redux/mainReducer'
import { useNavigate, useLocation } from 'react-router-dom'


const Header: React.FC = React.memo(() => {
    let navigate = useNavigate()
    let loc = useLocation();
    const [location, setLocation] = useState<string>('NewYork')
    const [restaurant, setRestaurant] = useState<string>('restaurants')
    const dispatch = useDispatch()
    const search = (e: React.MouseEvent<HTMLElement>) => {
        if (loc.pathname === '/restaurant') {
            navigate('/main')
        }
        e.preventDefault()
        dispatch(actions.setLocationAC(location))
        dispatch(actions.setTermAC(restaurant))
    }
    return (
        <div className={s.main}>
            <div className={s.container}>
                <div className={s.logoBlock}>
                    <div className={s.log}>
                        <img src={logo} alt="Logo" className={s.logo} />
                        <div className={s.name}>Rest</div>
                    </div>
                    <button onClick={search} className={s.searchMobileButton}>
                        Search
                    </button>
                </div>
                <form className={s.form}>
                    <div className={s.inputs}>
                        <input onChange={(e) => setRestaurant(e.target.value)} type="text" placeholder='Restaurants' className={`${s.searchInput} ${s.serchInputRestaurants}`} />
                        <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder='New York' className={s.searchInput} />
                    </div>
                    <button onClick={search} className={s.searchButton}>
                        <img src={searchPhoto} alt="Search" className={s.searchImg} />
                    </button>
                </form>

                <button className={s.link}>For business</button>
                <button className={s.link}>Write some review</button>
            </div>
        </div>
    );
});

export default Header;




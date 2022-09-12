import React from 'react';
import s from './Header.module.css'
import logo from '../../../src/img/Logo.png'
import search from '../../..//src/img/search.png'

const Header = () => {
    return (
        <div className={s.main}>
            <div className={s.container}>
                <div className={s.logoBlock}>
                    <img src={logo} alt="Logo" className={s.logo} />
                    <div className={s.name}>Rest</div>
                </div>
                <div className={s.search}>
                    <form className={s.form}>
                        <div className={s.inputs}>
                            <input type="text" placeholder='Restaurants' className={`${s.searchInput} ${s.serchInputRestaurants}`} />
                            <input type="text" placeholder='New York' className={s.searchInput} />
                        </div>
                        <button className={s.searchButton}>
                            <img src={search} alt="Search" className={s.searchImg} />
                        </button>
                    </form>

                </div>
                <button className={s.link}>For business</button>
                <button className={s.link}>Write some review</button>
            </div>
        </div>
    );
};

export default Header;
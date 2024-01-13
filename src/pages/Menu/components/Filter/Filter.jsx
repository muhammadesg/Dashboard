import React, { useEffect, useState } from "react";
import './filter.css'

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import FilterList from './FilterList/FilterList'
import Button from '../Button/Button'

import Basket from '../../../../assets/basket2.svg'
import logo from '../../../../assets/logo.svg'

import { useSelector } from 'react-redux'

const Filter = ({setIsLoading, openMenu, lang}) => {
    const { t } = useTranslation();
    const { totalPrice } = useSelector(state => state.cart);

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll2 = () => {
            const filterElement = document.querySelector('#filterSection');
            const isElementSticky = window.scrollY >= filterElement.offsetTop;
            setIsSticky(isElementSticky);
        }

            window.addEventListener('scroll', handleScroll2);
            return () => {
                window.removeEventListener('scroll', handleScroll2);
            };
    }, []);

    return (
        <div className={`filter ${isSticky ? 'active' : ''}`} id='filterSection'>
            <div className='filter_block container'>
                <div className={`filter__inner ${isSticky ? 'active' : ''}`}>
                    <div className="filter__logo">
                        <img src={logo} alt="" />
                    </div>
                    <FilterList className="filter__div" lang={lang} setIsLoading={setIsLoading}/>
                </div>
                <Button className='filter_cart' openMenu={openMenu}>
                    <img src={Basket} alt="" />
                    {
                        totalPrice == 0 ? t('Basket') : totalPrice + ` ${t('Sum')}`
                    }
                </Button>
            </div>
        </div>
    )
}

export default Filter;

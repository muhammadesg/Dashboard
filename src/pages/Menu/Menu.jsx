import React, { useState } from 'react';
import Cards from './components/Cards/Cards'
import Filter from './components/Filter/Filter'

const Menu = ({setIsLoading, openMenu, lang}) => {
  return (
    <>
        <Filter setIsLoading={setIsLoading} openMenu={openMenu} lang={lang}/>
        <Cards setIsLoading={setIsLoading} lang={lang}/>
    </>
  )
}

export default Menu;

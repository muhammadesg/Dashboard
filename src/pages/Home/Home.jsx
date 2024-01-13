import React from 'react'

import Header from './components/Header/Header'
import Mainbanner from './components/Mainbanner/Mainbanner'

const Home = ({ActiveDefault, setDefault, setIsLoading, Menu, openMenu, lang}) => {
  return (
    <>
        <Header ActiveDefault={ActiveDefault} lang={lang} setDefault={setDefault} Menu={Menu} openMenu={openMenu}/>
        <Mainbanner setIsLoading={setIsLoading} lang={lang}/>
    </>
  )
}

export default Home
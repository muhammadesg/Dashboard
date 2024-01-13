import { useState, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import MenuComponent from './pages/Menu/Menu'
import Footer from './pages/Footer/Footer'
import Chat from './components/Chat/Chat'
import Productinfo from './components/ProductInfo/Productinfo';


function App() {
  const lang = localStorage.getItem("lang") || "ru";
  const [ActiveDefault, setDefault] = useState(lang)
  const [isLoading, setIsLoading] = useState(true);

  // Menu
  const [Menu, setMenu] = useState(false)

  const openMenu = () => {
    setMenu(!Menu);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={isLoading ? 'loader__inner' : 'loader__inner active'}>
        <div className="loader"></div>
      </div>

      <Home ActiveDefault={ActiveDefault} setDefault={setDefault} setIsLoading={setIsLoading} setMenu={setMenu} Menu={Menu} openMenu={openMenu} lang={lang}/>
      <MenuComponent setIsLoading={setIsLoading} openMenu={openMenu} lang={lang}/>
      <Contact setIsLoading={setIsLoading} lang={lang}/>
      <Footer ActiveDefault={ActiveDefault} setDefault={setDefault} lang={lang}/>
      <ToastContainer/>
      <Chat/>
    </>
  )
}

export default App

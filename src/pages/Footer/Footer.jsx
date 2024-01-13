import React, {useState, useEffect} from 'react'

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import './style.css'

import logo from '../../assets/logo.svg'
import lang_1 from '../../assets/lang_1.png'
import lang_2 from '../../assets/lang_2.png'
import lang_3 from '../../assets/lang_3.png'
import top from '../../assets/top.svg'

const Footer = ({ActiveDefault, setDefault, lang}) => {
    const [w1,w2] = useState(false)

    const { t } = useTranslation();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    //languages 
    const changeLanguageRu = () => {
      localStorage.setItem("lang", "ru");
      changeLanguage("ru");
    };

    const changeLanguageUz = () => {
      localStorage.setItem("lang", "uz");
      changeLanguage("uz");
    };

    const changeLanguageEn = () => {
      localStorage.setItem("lang", "en");
      changeLanguage("en");
    };
    
    
    const openFunction = () => {
        w2(!w1)
    }

    const handleOutsideClick = (event) => {
      // Проверяем, что клик был выполнен вне области элемента
      if (!event.target.closest(".dropdown2")) {
        w2(false);
      }
    };
    
    useEffect(() => {
      // Добавляем обработчик события клика при монтировании компонента
      document.addEventListener("click", handleOutsideClick);
    
      // Удаляем обработчик события клика при размонтировании компонента
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, []);

    const DropFunction = (info) => {
      w2(false);
      setDefault(info);
      if (info === "ru") {
        changeLanguageRu();
      } else if (info === "en") {
        changeLanguageEn();
      } else if (info === "uz") {
        changeLanguageUz();
      }
    };
  return (
    <>
        <footer className='footer'>
            <div className='container'>
              <div className='footer__inner'>
                  <div className='footer__logo'>
                    <img src={logo} alt="" />
                  </div>

                  <nav className='navbar'>
                    <ul className='navbar__inner'>
                      <li className='navbar__item'>
                        <a className='navbar__item-a-footer' href="#home">{t('Home')}</a>
                      </li>

                      <li className='navbar__item'>
                        <a className='navbar__item-a-footer' href="#menu">{t('Menu')}</a>
                      </li>

                      <li className='navbar__item'>
                        <a className='navbar__item-a-footer active' href="#deliverySection">{t('Contact')}</a>
                      </li>
                    </ul>
                  </nav>

                  <div className='footer__end'>
                    <div className='language'>
                    <div className="dropdown2">
                        <div className='select2' onClick={openFunction}>
                          <div className="selected2">
                            <img
                              src={
                                lang === "ru" ? lang_1 : lang === "en" ? lang_2 : lang === "uz" ? lang_3 : ActiveDefault
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <ul className={w1 === true ? 'dropmenu2 active' : 'dropmenu2'}>
                        <li className='dropmenu__item2' onClick={() => DropFunction("en")}><img src={lang_2} alt="" /></li>

                        <li className='dropmenu__item2' onClick={() => DropFunction("uz")}><img src={lang_3} alt="" /></li>

                        <li className='dropmenu__item2' onClick={() => DropFunction("ru")}><img src={lang_1} alt="" /></li>
                        </ul>
                    </div>
                    </div>
                  </div>
              </div>
            </div>
        </footer>
              
        <div className='footer_bt'>
            <div className='container'>
                <div className='footer__bottom'>
                    <div className='footer__reklam'>
                        <p>Copyright © 2022 sapid</p>
                    </div>

                    
                    <a href="#home">
                        <button className='footer__btn'>
                            <img src={top} alt=""/>
                        </button>
                    </a>

                    <div className='footer__company'>
                        <p>{t('Mycareer')}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer
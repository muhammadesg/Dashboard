import React, { useEffect, useState } from "react";
import axios from "axios";

import { useTranslation } from 'react-i18next';

import './style.css'
import Title from './components/Title/Title'
import Accordion from './components/Accordion/Accordion'
import Bike from '../../assets/bike.svg'

const Contact = ({ setIsLoading, lang }) => {
    const [accordions, setAccordions] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        axios
          .get('http://127.0.0.1:8000/api/accordions', {
            headers: {
              "Accept-Language": lang,
            },
          })
          .then((response) => {
            if (response.data == null || response.data.length === 0) {
              setIsLoading(true);
            } else {
              setIsLoading(false);
              setAccordions(response.data)
            }
          })
          .catch((error) => {
            console.error("Ошибка при получении данных:", error);
            setIsLoading(true);
          });
      }, [setIsLoading]);
  return (
    <>
        <section className='delivery' id='deliverySection'>
            <div className='container'> 
                <div className='delivery__inner'>
                    <div className='delivery_block'>
                        <Title />
                        <div className='delivery_wrap'>
                            <Accordion accordions={accordions} lang={lang}/>
                        </div>
                    </div>

                    <div className='delivery__right' data-aos="fade-up-left">
                        <img src={Bike} alt="" />
                    </div>
                </div>

                <div className="map">
                    <div className="map__left" data-aos="zoom-in-down">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.8238095919032!2d69.20176097520401!3d41.35618319793148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d88bc70f0b9%3A0xb01a0158a3a86e7c!2sINNO%20Innovative%20Training%20and%20Production%20Technopark!5e0!3m2!1sru!2s!4v1702558627842!5m2!1sru!2s"
                            width={600}
                            height={450}
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className="map__right" data-aos="zoom-in-up">
                        <h2 className="map__title">{t('We')}</h2>
                        
                        <p className="map__text">{t('ContactText')}</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Contact
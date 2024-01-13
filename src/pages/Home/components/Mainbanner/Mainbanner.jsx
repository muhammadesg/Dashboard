import React, { useEffect, useState } from "react";
import axios from "axios";

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import './style.css'

const Mainbanner = ({ setIsLoading, lang }) => {
  const { t } = useTranslation();

  // const apiUrl = "http://cfsrcs.ded.glassdn2.beget.tech/public/api/banners";
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://127.0.0.1:8000/api/banners', {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        if (response.data == null || response.data.length === 0) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
          setBanners(response.data)
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setIsLoading(true);
      });
  }, [setIsLoading]);
  
  return (
    <>
      <div className='mainbanner'>
        <div className='container'>
          <Swiper
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              dynamicBullets: true,
            }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            
            {
              banners.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className='mainbanner__inner'>
                    <div className='mainbanner__left'>
                      <h1 className='mainbanner__title' data-aos="fade-up">{item[`title_${lang}`]}</h1>
                      <p className='mainbanner__text' data-aos="fade-up-right">{item[`text_${lang}`]}</p>

                      <a href="#menu" className='mainbanner__btn'>{t('InMenu')}</a>
                    </div>

                    <div className='mainbanner__right' data-aos="fade-left">
                      <img src={item.img_url} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default Mainbanner
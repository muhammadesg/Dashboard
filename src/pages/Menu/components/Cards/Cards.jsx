import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, minusItem, plusItem } from '../../../../store/cartSlice';

import { Swiper, SwiperSlide } from 'swiper/react';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import ProductInfo from "../../../../components/ProductInfo/Productinfo";

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import CardList from "./CardList";
import "./cards.css";

const Cards = ({setIsLoading, lang}) => {

    const [Categories, setCategories] = useState([]) 
    const [Cards, setCards] = useState([]) 
    const [Orders, setOrders] = useState([])
    const [showProductInfo, setShowProductInfo] = useState(false);
  
    const handleClick = () => {
      setShowProductInfo(true);
    };

    const dispatch = useDispatch();

    const apiUrlCategories = "http://127.0.0.1:8000/api/categories";

    useEffect(() => {
      setIsLoading(true)
        axios
        .get(apiUrlCategories,{
          headers: {
            "Accept-Language": lang,
          },
        })
        .then((response) => {
          if (response.data == null || response.data.length === 0) {
            setIsLoading(true);
          } else {
            setIsLoading(false);
            setCategories(response.data)
          }
        })
        .catch((error) => {
            console.error("Ошибка при получении данных:", error);
            setIsLoading(true)
        });
    }, []);

    
    // Cards 
    useEffect(() => {
      setIsLoading(true)
      axios
      .get("http://127.0.0.1:8000/api/cards",{
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        if (response.data == null || response.data.length === 0) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
          setCards(response.data)
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setIsLoading(true)
      });
    }, []);

    //Orders
    useEffect(() => {
      setIsLoading(true)
      axios
      .get("http://127.0.0.1:8000/api/cards",{
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        if (response.data == null || response.data.length === 0) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
          setOrders(response.data)
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setIsLoading(true)
      });
    }, []);

    // i18text
  const { t } = useTranslation();

  return (
    <>
      <div className="content" id="menu">
          <div className="content__all">
            <h2 className="content__all-title">{t('Top')}</h2>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                dynamicBullets: true,
              }}
              loop={true}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper"
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 5,
                },
                1400: {
                  slidesPerView: 4,
                },
                1750: {
                  slidesPerView: 5,
                },
              }}
            >
              {Orders.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <div>
                    <CardList {...product} lang={lang} product={product} handleClick={handleClick}/>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {showProductInfo && (
              <ProductInfo 
                showProductInfo={showProductInfo} 
                setShowProductInfo={setShowProductInfo} 
                lang={lang}
                data-aos={showProductInfo ? 'fade-in' : 'fade-out'}
              />
            )}

          </div>
        <div className="container">
          {
            Categories.map((card) => (
                <div key={card.id}>
                  <div className="content__inner" id={card.id}>
                    <div className="content__top">
                      <h2>{card[`name_${lang}`]}</h2>
                    </div>
                    <div className="content_list">
                      {
                        Cards.filter((product) => product.category_id == card.id).map((product) => (
                          <CardList {...product} key={product.id} lang={lang} product={product} handleClick={handleClick}/>
                        ))
                      }
                    </div>
                  </div>
                </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Cards;

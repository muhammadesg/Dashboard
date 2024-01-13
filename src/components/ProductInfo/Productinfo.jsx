import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, minusItem, plusItem } from '../../store/cartSlice';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import './style.css'

const Productinfo = ({ setShowProductInfo, ShowProductInfo, lang}) => {
  const dispatch = useDispatch();
  const cartItemsInfo = useSelector(state => state.cart.cartItems);

  // i18text  
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Если корзина не пуста, берем первый элемент
  const productToShow = cartItemsInfo.length > 0 ? cartItemsInfo[cartItemsInfo.length - 1] : null;

  const [CardId, setCardId] = useState(productToShow ? productToShow.id : null);

  const onClickAdd = () => {
    dispatch(addToCart({
      id: productToShow.id,
      img_url: productToShow.img_url,
      title: productToShow.title,
      DiscountProduct: productToShow.DiscountProduct,
      price: productToShow.price,
      discount: productToShow.discount,
      text: productToShow.text,
      count: 1,
      category: productToShow.category
    }));
  };

  const onClickMinus = (e) => {
    if (e <= 1) {
      return(false)
    } else {
      dispatch(minusItem(CardId));
    }
  };  

  const onClickPlus = () => {
    dispatch(plusItem(CardId));
  };

  const cartItem = useSelector(state => state.cart.cartItems.find(obj => obj.id === CardId));
  const addedCount = cartItem ? cartItem.count : 0;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item.id === CardId);
  const DiscountProcent = productToShow.price * productToShow.discount / 100;
  const DiscountProduct = productToShow.price - DiscountProcent;


  const OnclickClose = () => {
    setShowProductInfo(false)
  }

  return (
    <>
      {productToShow && (
        <div className='info'>
          <div className='info__inner' data-aos="fade-up"
     data-aos-anchor-placement="bottom-center">
            <div className='info__top'>
              <button className='info__close' data-aos="zoom-in" onClick={OnclickClose}><i className="fa-solid fa-arrow-left"></i></button>
            </div>

            <div className='info__card'>
              <div className='info__left'>
                <img src={productToShow.img_url} alt="" />
              </div>

              <div className='info__right'>
                <h2 className='info__title' data-aos="fade-up"
     data-aos-anchor-placement="top-center">{productToShow.title}</h2>
                <p className='info__text' data-aos="fade-up"
     data-aos-anchor-placement="top-center">{productToShow.text}</p>
                  {productToShow.discount == null ? <span className="info__price" data-aos="fade-up">{productToShow.price} {t('Sum')}</span> : null}
                  {productToShow.discount == null ? null : <span className="info__price">{DiscountProduct} {t('Sum')}</span>}
                <div className="info_counter">
                  <button className="info_minus" onClick={() => onClickMinus(addedCount)}>
                    <i className="fas fa-regular fa-minus"></i>
                  </button>
                  <span className="info_span">{addedCount > 0 && <i>{addedCount}</i>}</span>
                  <button className="info_plus" onClick={onClickPlus}>
                    <i className="fas fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Productinfo;

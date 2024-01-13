import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, minusItem, plusItem } from '../../../../store/cartSlice';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const CardList = ({ product, id, price, img_url, discount, count, category, lang, handleClick }) => {

  // const [showProductInfo, setShowProductInfo] = useState(false);

  const dispatch = useDispatch();
  const title = product[`title_${lang}`]
  const text = product[`text_${lang}`]

  const onClickAdd = () => {
    dispatch(addToCart({ id, img_url, title, DiscountProduct, price, discount, text, count, category }));

    // setShowProductInfo(true);
    handleClick()
  };

  const cartItem = useSelector((state) => state.cart.cartItems.find((obj) => obj.id === id));
  const addedCount = cartItem ? cartItem.count : 0;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item.id === id);
  const DiscountProcent = price * discount / 100;
  const DiscountProduct = price - DiscountProcent;

  // i18text
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <li className='content_item'>
          {
            discount == null ? null : <div className='content__discount'>
              <p>- {discount} %</p>
            </div>
          }
        <div className='content__image' onClick={onClickAdd}>
          <img src={img_url} alt="" />
        </div>
        <h2 className="content_title">{product[`title_${lang}`]}</h2>
        <p className="content_text">{product[`text_${lang}`]}</p>
        <div className="content_actions">
            <div className='content_actions2'>
              <div className="content_wrap">
                {discount == null ? <span className="content_price">{price} {t('Sum')}</span> : null}
                {discount == null ? null : <span className="content_price">{DiscountProduct} {t('Sum')}</span>}
                {discount == null ? null : <span className="content_oldprice">{price} {t('Sum')}</span>}
              </div>
            </div>
        </div>
              <button className="content_cart" onClick={onClickAdd}>
                {t('InBasket')}
              </button>
      </li>
    </>
  );
};

export default CardList;

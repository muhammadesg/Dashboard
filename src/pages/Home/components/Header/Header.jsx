import React, {useState, useEffect} from 'react'
import axios from 'axios';

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './drawer.css'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, minusItem, removeAll, removeFromCart } from '../../../../store/cartSlice'

import './style.css'
import basket from '../../../../assets/basket.svg'
import logo from '../../../../assets/logo.svg'
import close_menu from '../../../../assets/close_menu.svg'
import trash from '../../../../assets/trash.svg'
import lang_1 from '../../../../assets/lang_1.png'
import lang_2 from '../../../../assets/lang_2.png'
import lang_3 from '../../../../assets/lang_3.png'
import shop from '../../../../assets/empty-cart-icon.svg'

const Header = ({ActiveDefault, setDefault, Menu, openMenu, lang}) => {
  let [Dot, setDot] = useState(false)
  
  // Phone
  function formatPhoneNumber(value) {
    const phoneNumber = value.replace(/\D/g, ''); // Удалить все нецифровые символы
    
    if (phoneNumber.startsWith('9')) {
      // Если номер начинается с '998', добавляем '+'
      return '+' + phoneNumber.replace(/(\d{1,3})(\d{1,2})(\d{1,3})(\d{1,2})(\d{1,2}).*/, '$1 $2 $3 $4 $5');;
    } else if (phoneNumber.length > 1) {
      // Применяем форматирование к оставшимся цифрам
      return phoneNumber.replace(/(\d{1,3})(\d{1,2})(\d{1,3})(\d{1,2})(\d{1,2}).*/, '$1 $2 $3 $4 $5');
    } else {
      // Если номер короткий или пустой, возвращаем его как есть
      return phoneNumber;
    }
  } 
  
  // i18text  
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
  // DropDownFunction
  
  const [w1,w2] = useState(false)
  
  const openFunction = () => {
    w2(!w1)
    if (!event.target.closest(".dropdown")) {
        w2(false);
    }
  }


  const handleOutsideClick = (event) => {
    // Проверяем, что клик был выполнен вне области элемента
    if (!event.target.closest(".dropdown")) {
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
  
  const [Post, setPost] = useState(false)
  
  const openPost = () => {
    setPost(!Post)
  }
  
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

    const onRemove = (id) => {
      dispatch(removeFromCart(id));
    };
    
    const onClickPlus = (id) => {
      dispatch(
        addToCart({
          id,
        })
        )
      }
      
      const onClickMinus = (id) => {
        dispatch(minusItem(id))
      }
      
      const { totalPrice } = useSelector(state => state.cart)
      
      const [telephone, setTelephone] = useState("");
      
      const [address, setAddress] = useState("");
      const [name, setName] = useState("");
      
      const success = () => toast.success(t('PostOrder'));
      const handleSubmit = (e) => {
        
        success();
        e.preventDefault();
        dispatch(removeAll())
        
        openPost()
        
        openMenu()
        
        // Create an array of products from the cartItems
        const products = cartItems.map((item) => ({
          name: item.title,
          price: item.discount == null ? item.price : item.DiscountProduct,

          quantity: item.count,
        }));
        
        const payload = {
          name: name,
          telephone: telephone,
          address: address,
          total_price: totalPrice,
          products: products,
        };
        
        axios
        .post("http://127.0.0.1:8000/api/orders", payload, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((response) => {
          console.log("Order placed successfully");
          setName("");
          setTelephone("");
          setAddress("");
        })
        .catch((err) => {
          console.error("Failed to place order", err);
        });
      };
      
      useEffect(() => {
        if (cartItems.length > 0) {
          setDot(true)
        } else {
          setDot(false)
        }
      }, [cartItems]); // Добавлен массив зависимостей      

  return (
    <>
        <header className='header' id='home'>
            <div className='container'>
              <div className='header__inner'>
                <div className='header__block'>
                    <div className='header__logo'>
                      <img src={logo} alt="" />
                    </div>

                    <nav className='navbar'>
                      <ul className='navbar__inner'>
                        <li className='navbar__item'>
                          <a className='navbar__item-a active' href="#home">{t('Home')}</a>
                        </li>

                        <li className='navbar__item'>
                          <a className='navbar__item-a' href="#menu">{t('Menu')}</a>
                        </li>

                        <li className='navbar__item'>
                          <a className='navbar__item-a' href="#deliverySection">{t('Contact')}</a>
                        </li>
                      </ul>
                    </nav>
                </div>

                  <div className='header__end'>
                    <button className='header__basket' onClick={openMenu}>
                      <i className={`fas fa-regular fa-basket-shopping ${Dot ? 'fa-bounce' : ''}`}></i>
                      {
                        t('Basket')
                      }
                      <div className={`basket__dot ${Dot ? 'active' : ''}`}>
                        {cartItems.length}
                      </div>
                    </button>

                    <div className='language'>
                    <div className="dropdown">
                        <div className='select' onClick={openFunction}>
                          <div className="selected">
                            <img
                              src={
                                lang === "ru" ? lang_1 : lang === "en" ? lang_2 : lang === "uz" ? lang_3 : ActiveDefault
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <ul className={w1 ? 'dropmenu active' : 'dropmenu'}>
                        <li className='dropmenu__item' onClick={() => DropFunction("uz")}>
                          <img src={lang_3} alt="" />
                        </li>
                        <li className='dropmenu__item' onClick={() => DropFunction("en")}>
                          <img src={lang_2} alt="" />
                        </li>
                        <li className='dropmenu__item' onClick={() => DropFunction("ru")}>
                          <img src={lang_1} alt="" />
                        </li>
                      </ul>
                    </div>
                    </div>
                  </div>
              </div>

              <div className='header__inner-mobile'>
                  <nav className='navbar-mobile'>
                    <ul className='navbar__inner-mobile'>
                      <li className='navbar__item-mobile'>
                        <a className='navbar__item-a-mobile active' href="">{t('Home')}</a>
                      </li>

                      <li className='navbar__item-mobile'>
                        <a className='navbar__item-a-mobile' href="#menu">{t('Menu')}</a>
                      </li>

                      <li className='navbar__item-mobile'>
                        <a className='navbar__item-a-mobile' href="#deliverySection">{t('Contact')}</a>
                      </li>
                    </ul>
                  </nav>
              </div>
            </div>
        </header>

        <div className={`overlay ${Menu == true ? 'overlayVisible' : ''}`}>
            <div className='drawer'>
                <h2 className='drawer_title'>
                  {t('Basket')} <img src={close_menu} alt="close" className='close_icon' onClick={openMenu}/>
                </h2>

                {
                    cartItems.length > 0 ? (
                        <div style={{ marginTop: '30px' }}>
                            {cartItems.map((item, index) => (
                                <div className='cartItem' key={index}>
                                    <div className='cartItem_logo'>
                                      <img src={item.img_url} alt=""  />
                                    </div>
                                    <div className='cartItem_inner'>
                                        <h3 className='cartItem_title'>{item.title}</h3>
                                        {
                                          item.discount == 0 || null ? <span className='cartItem_price'>{item.price} {t('Sum')}</span> : <span className='cartItem_price'>{item.DiscountProduct} {t('Sum')}</span>
                                        }
                                    </div>
                                    <div>
                                        <img
                                            src={trash}
                                            alt="" className='cartItem_delete'
                                            onClick={() => onRemove(item.id)}
                                        />
                                        <div className='cartItem_counter'>
                                            <button className='cartItem_minus' onClick={() => onClickMinus(item.id)}>
                                              <i className="fas fa-regular fa-minus"></i>
                                            </button>
                                            <span className='cartItem_span'>{item.count}</span>
                                            <button className='cartItem_plus' onClick={() => onClickPlus(item.id)}>
                                              <i className="fas fa-regular fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="items">
                                <div>
                                    <span>{t('Total')} :</span>
                                    <h3>{totalPrice} {t('Sum')}</h3>
                                </div>
                                <button className='items_link' onClick={openPost
                                }>{t('Order')}</button>
                            </div>
                        </div>
                    ) : (
                        <div className='empty'>
                            <img src={shop} alt="" className='empty_logo' />
                            <p className='empty_text'>{t('EmptyBasket')} 😕</p>
                            <button className='empty_btn' onClick={openMenu}>{t('AddBasket')}</button>
                        </div>
                    )
                }
            </div>
        </div>

        <div className={`post ${Post == true ? 'active' : ''}`}>
            <div className='post__inner'>
                <div className='post__top'>
                  <h2 className='post__title'>{t('OrderDelivery')}</h2>
                  <h2 className='post__close'>
                      <i alt="close" className="close_icon ri-arrow-right-line" onClick={openPost}></i>
                  </h2>
                </div>

                <form action="">
                <input
                  className="post__tel"
                  type="text"
                  name="name"
                  placeholder={t('YourName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="post__tel"
                  type="tel"
                  name="telephone"
                  placeholder={t('Phone')}
                  value={formatPhoneNumber(telephone) || '+998'}
                  maxLength={17}
                  onChange={(e) => setTelephone(formatPhoneNumber(e.target.value))}
                  onBlur={(e) => {
                    if (!e.target.value || e.target.value === '+') {
                      setTelephone('+998');
                    }
                  }}
                />
                  <input
                  className="post__address"
                  type="text"
                  name="address"
                  placeholder={t('Address')}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                  <button className='post__btn' type='submit' name='submit' onClick={handleSubmit}>{t('Send')}</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Header
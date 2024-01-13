import React from "react";
import tel from '../../../../../assets/tel.svg'
import mail from '../../../../../assets/mail.svg'
import local from '../../../../../assets/local.svg'
import Arrow from '../../../../../assets/Arrow.svg'

const AccordionItem = ({ handler, faq, open, lang }) => {
  return (
    <li className='accordion-item' key={faq.id}>
      <button className='accordion-header' onClick={() => { handler(faq.id) }}>
        {faq[`address_${lang}`]}
        <img
          src={Arrow} alt=""
          className={`accordion-arrow ${faq.id === open ? "active" : ""}`}
        />
      </button>
      <div className={`accordion-collapse ${faq.id === open ? "open" : ""}`}>
        <div className='accordion-body'>
          <div className='accordion__item'>
            <img src={tel} alt="" />
          </div>
          <div className='accordion__item'>
            <img src={mail} alt="" /> {faq.email}
          </div>
          <div className='accordion__item'>
            <img src={local} alt="" /> {faq[`location_${lang}`]}
          </div>
        </div>
      </div>
    </li>
  );
}

export default AccordionItem;

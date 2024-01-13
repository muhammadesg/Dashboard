import React from 'react'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const { t } = useTranslation();
  return (
    <h1 data-aos="fade-up-right" className='delivery_title'>{t('DeliveryTashkent')}</h1>
  )
}

export default Title
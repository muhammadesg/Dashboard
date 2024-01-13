import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollSpy from './ScrollSpy';

import '../filter.css';

const FilterList = ({ setIsLoading, lang }) => {
  const apiUrl = 'http://127.0.0.1:8000/api/categories';
  const [products, setProducts] = useState([]);
  const [filterActive, setFilterActive] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(apiUrl,{
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        if (response.data == null || response.data.length === 0) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
          setProducts(response.data)
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        setIsLoading(true)
      });
  }, []);

  const funActive = (item) => {
    setFilterActive(item);
  };

  const handleSectionChange = (sectionId) => {
    funActive(sectionId);
  };

  return (
    <div>
      <ScrollSpy onSectionChange={handleSectionChange} />
      <ul className="filter_list">
              {products.map((product) => (
                <a href={'#' + product.id} key={product.id}>
                  <li
                    className={filterActive == product.id ? 'filter_item active' : 'filter_item'}
                    onClick={() => funActive(product.id)}
                  >
                    {product[`name_${lang}`]}
                  </li>
                </a>
              ))}
      </ul>
    </div>
  );
};

export default FilterList;

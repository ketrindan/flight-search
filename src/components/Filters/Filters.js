import React, { useState } from 'react';
import filtersStyles from  './Filters.module.css';
import AirlineCheckbox from '../AirlineCheckbox/AirlineCheckbox';
import { v4 as uuidv4 } from 'uuid';
import image from '../../images/arrow.png'

function Filters(props) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  function getMinPrice(airline) {
    return props.minPrices[airline];
  }

  function handleClick() {
    setFiltersOpen((state) => !state);
  }

  return (
    <section className={filtersStyles.section}>
      <div className={`${filtersStyles.filters} ${filtersOpen ? `${filtersStyles.filters_opened}` : ""}`}>
        <>
          <div className={filtersStyles.fieldset}>
            <h2 className={filtersStyles.heading}>Сортировать</h2>
            <div className={filtersStyles.container}>
              <input type="radio" name="sort" id="ascending_price" value="ascending_price" className={filtersStyles.filter} onChange={props.handleSort}/>
              <label htmlFor="ascending_price" className={`${filtersStyles.label} ${filtersStyles.label_modified}`}>по возрастанию цены</label>
            </div>
            <div className={filtersStyles.container}>
              <input type="radio" name="sort" id="descending_price" value="descending_price" className={filtersStyles.filter} onChange={props.handleSort}/>
              <label htmlFor="descending_price" className={`${filtersStyles.label} ${filtersStyles.label_modified}`}>по убыванию цены</label>
            </div>
            <div className={filtersStyles.container}>
              <input type="radio" name="sort" id="ascending_time" value="ascending_time" className={filtersStyles.filter} onChange={props.handleSort}/>
              <label htmlFor="ascending_time" className={`${filtersStyles.label} ${filtersStyles.label_modified}`}>по времени в пути</label>
            </div>
          </div>
          <div className={filtersStyles.fieldset}>
            <h2 className={filtersStyles.heading}>Фильтровать</h2>
            <div className={filtersStyles.container}>
              <input type="checkbox" name="filter" id="1_change" value="1_change" className={filtersStyles.filter} onChange={props.handleFilter}/>
              <label htmlFor="1_change" className={`${filtersStyles.label} ${filtersStyles.label_modified}`}>1 пересадка</label>
            </div>
            <div className={filtersStyles.container}>
              <input type="checkbox" name="filter" id="no_change" value="no_change" className={filtersStyles.filter} onChange={props.handleFilter}/>
              <label htmlFor="no_change" className={`${filtersStyles.label} ${filtersStyles.label_modified}`}>без пересадок</label>
            </div>
          </div>
        </>
        <>
          <div className={filtersStyles.fieldset}>
            <h2 className={filtersStyles.heading}>Цена</h2>
            <div className={filtersStyles.container}>
              <label htmlFor="from" className={filtersStyles.label}>От</label>
              <input type="text" id="from" name="price_from" className={filtersStyles.text_input} onChange={props.handleSetPrice}/>
            </div>
            <div className={filtersStyles.container}>
              <label htmlFor="to" className={filtersStyles.label}>До</label>
              <input type="text" id="to" name="price_to" className={filtersStyles.text_input} onChange={props.handleSetPrice}/>
            </div>
          </div>
          <div className={filtersStyles.fieldset}>
            <h2 className={filtersStyles.heading}>Авиакомпании</h2>
            {props.airlines.map((airline) => (
              <AirlineCheckbox key={uuidv4()} airline={airline} price={getMinPrice(airline)} handleChoose={props.handleAirlinesSearch} chosenAirlines={props.chosenAirlines}/>
            ))}
          </div>
        </>
      </div>
      <button className={filtersStyles.btn} onClick={handleClick}>
        <img src={image} alt="arrow" className={`${filtersStyles.image} ${filtersOpen ? `${filtersStyles.image_transformed}` : ""}`}/>
      </button>
    </section>
  );
}

export default Filters;
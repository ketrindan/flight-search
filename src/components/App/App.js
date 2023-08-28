import styles from  './App.module.css';
import Filters from '../Filters/Filters';
import FlightsList from '../FlightsList/FlightsList';
import { useState, useEffect } from 'react';

import data from '../../utils/flights.json';

function App() {
  const flightsData = data.result.flights;
  const [foundFlights, setFoundFlights] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [sortingChecked, setSortingChecked] = useState(null);
  const [filterChecked, setFilterChecked] = useState(null);
  const [minPriceChecked, setMinPriceChecked] = useState(null);
  const [maxPriceChecked, setMaxPriceChecked] = useState(null);
  const [airlinesChecked, setAirlinesChecked] = useState([]);
  
  function getAirlines(data) {
    let list = [];
    for (let i=0; i<data.length; i++) {
      list.push(data[i].flight.carrier.caption);
    }

    const airlines = Array.from(new Set(list)).sort();
    
    return airlines;
  }

  function getMinPrices(data) {
    const airlines = getAirlines(flightsData);
    let obj = {};

    const getPrice = (airline) => {
      let prices = [];
      for (let i=0; i<data.length; i++) {
        if (data[i].flight.carrier.caption === airline) {
          prices.push(Number(data[i].flight.price.total.amount));
        }
      }

      return Math.min(...prices);
    }
    
    for (let i=0; i<airlines.length; i++) {
      obj[airlines[i]] = getPrice(airlines[i]);
    }

    return obj;
  }

  function toggleSort() {
    const sort = document.querySelectorAll('input[name="sort"]');
    for (const i of sort) {
      if (i.checked) {
        setSortingChecked(i.value)
        setIsSorted(true)
      }
    }
  }

  function toggleFilter() {
    const filters = document.querySelectorAll('input[name="filter"]');
    for (const i of filters) {
      if (i.checked) {
        setFilterChecked(i.value)
        setIsSorted(true)
      } else {
        setFilterChecked(null)
        setIsSorted(false)
      }
    }
  }

  function setPriceSearch() {
    const minPrice = document.querySelector('input[name="price_from"]');
    const maxPrice = document.querySelector('input[name="price_to"]');

    if (minPrice.value || maxPrice.value) {
      if (minPrice.value) {
        setMinPriceChecked(minPrice.value)
        setIsSorted(true);
      } 
      
      if (maxPrice.value) {
        setMaxPriceChecked(maxPrice.value)
        setIsSorted(true);
      } 
      
      if (minPrice.value && maxPrice.value) {
        setMinPriceChecked(minPrice.value);
        setMaxPriceChecked(maxPrice.value);
        setIsSorted(true);
      } 
    } else {
      setMinPriceChecked(null);
      setMaxPriceChecked(null);
      setIsSorted(false);
    }
  }

  /*function setAirlinesSearch(e) {
    const airlines = document.querySelectorAll('input[name="airline_filter"]');

    for (const i of airlines) {
      if (i.checked) {
        setAirlinesChecked([...airlinesChecked, i.value])
        setIsSorted(true)
        console.log(i.value)
        console.log(airlinesChecked)
      } else {
        setAirlinesChecked(airlinesChecked.filter((a) => a !== i.value))
      }
    }
    console.log(airlinesChecked)
  }*/

  function setAirlinesSearch(e) {
    const {value, checked} = e.target;

    if (checked) {
      console.log('sg')
      //setAirlinesChecked([...airlinesChecked, value])
      //setIsSorted(true)
    } else {
      //setAirlinesChecked(airlinesChecked.fiiter((i) => i !== value))
      //setIsSorted(false)
      console.log('fg')
    }
  }

  function sortFlights(data, sorting) {
    if (sorting !== null) {
      if (sorting === "ascending_price") {
        return data.sort(function(a, b) {
          return Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount);
        })
      } else if (sorting === "descending_price") {
        return data.sort(function(a, b) {
          return Number(b.flight.price.total.amount) - Number(a.flight.price.total.amount);
        })
      } else if (sorting === "ascending_time") {
        return data.sort(function(a, b) {
          return ((a.flight.legs[0].duration + a.flight.legs[1].duration) 
          - (b.flight.legs[0].duration + b.flight.legs[1].duration));
        })
      }
    } else {
      return data;
    }
  }

  function filterFlights(data, filter) {
    if (filter !== null) {
      if (filter === "1_change") {
        return data.filter(a => a.flight.legs[0].segments.length === 2 || a.flight.legs[1].segments.length === 2)
      } else if (filter === "no_change") {
        return data.filter(a => a.flight.legs[0].segments.length === 1 && a.flight.legs[1].segments.length === 1)
      }
    } else {
      return data;
    }
  }
  
  function searchPrice(data, minPrice, maxPrice) {
    if (minPrice !== null || maxPrice !== null) {
      if (minPrice !== null && maxPrice !== null) {
        return data.filter(a => Number(a.flight.price.total.amount) >= Number(minPrice) && Number(a.flight.price.total.amount) <= Number(maxPrice))
      }

      if (minPrice !== null) {
        return data.filter(a => Number(a.flight.price.total.amount) >= Number(minPrice));
      } 
      
      if (maxPrice !== null) {
        return data.filter(a => Number(a.flight.price.total.amount) <= Number(maxPrice));
      }
    } else {
      return data;
    }
  }

  function searchAirlines(data, airlines) {
    if (airlines.length > 0) {
      let res = [];
      data.forEach(a => airlines.includes(a.flight.carrier.caption) && res.push(a));
      console.log(res)
      return res;
    } else {
      return data;
    }
  }

  useEffect(() => {
    if (isSorted) {
      if (sortingChecked !== null) {
        const flights = sortFlights(flightsData, sortingChecked);
        setFoundFlights(() => [...flights]);
      }

      if (filterChecked !== null) {
        const flights = filterFlights(flightsData, filterChecked);
        setFoundFlights(() => [...flights]);
      }

      if (minPriceChecked !== null || maxPriceChecked !== null) {
        const flights = searchPrice(flightsData, minPriceChecked, maxPriceChecked);
        setFoundFlights(() => [...flights]);
      }

      if (airlinesChecked.length > 0) {
        console.log(airlinesChecked)
        const flights = searchAirlines(flightsData, airlinesChecked);
        setFoundFlights(() => [...flights]);
      }
    } else {
      setFoundFlights(flightsData);
    }
    
  }, [isSorted, sortingChecked, flightsData, filterChecked, minPriceChecked, maxPriceChecked, airlinesChecked]);

  return (
    <div className={styles.app}>
      <Filters airlines={getAirlines(flightsData)} minPrices={getMinPrices(flightsData)} 
        handleSort={toggleSort} handleFilter={toggleFilter} handleSetPrice={setPriceSearch}
        handleAirlinesSearch={setAirlinesSearch}
      />
      <FlightsList flightsData={foundFlights} />
    </div>
  );
}

export default App;

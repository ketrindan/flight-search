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
  const [filterChecked, setFilterChecked] = useState([]);
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

  function toggleFilter(e) {
    const {value, checked} = e.target;

    if (checked) {
      setFilterChecked([...filterChecked, value])
      setIsSorted(true)
    } else {
      setFilterChecked(filterChecked.filter((i => i !== value)))
      if (filterChecked.filter((i => i !== value)).length === 0 && airlinesChecked.length === 0 
        && maxPriceChecked === null && minPriceChecked === null
      ) {
        setIsSorted(false)
      }
    }
  }

  function setPriceSearch() {
    const minPrice = document.querySelector('input[name="price_from"]');
    const maxPrice = document.querySelector('input[name="price_to"]');

    if (minPrice.value || maxPrice.value) {
      setIsSorted(true);

      if (minPrice.value) {
        if (maxPriceChecked !== null) {
          setMinPriceChecked(minPrice.value);
          setMaxPriceChecked(maxPrice.value);
        } else {
          setMinPriceChecked(minPrice.value)
        }
      } 
      
      if (maxPrice.value) {
        if (minPriceChecked !== null) {
          setMinPriceChecked(minPrice.value);
          setMaxPriceChecked(maxPrice.value);
        } else {
          setMaxPriceChecked(maxPrice.value);
        }
      } 

    } else {
      setMinPriceChecked(null);
      setMaxPriceChecked(null);
      if (airlinesChecked.length === 0 && filterChecked.length === 0) {
        setIsSorted(false);
      }
    }
  }
  

  function setAirlinesSearch(e) {
    const {value, checked} = e.target;

    if (checked) {
      setAirlinesChecked([...airlinesChecked, value])
      setIsSorted(true)
    } else {
      setAirlinesChecked(airlinesChecked.filter((i => i !== value)))
      if (airlinesChecked.filter((i => i !== value)).length === 0 
        && maxPriceChecked === null && minPriceChecked === null && filterChecked.length === 0
      ) {
        setIsSorted(false)
      }
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
    if (filter.length > 0) {
      if (filter.includes("1_change")) {
        if (filter.includes("no_change")) {
          return data.filter(a => (a.flight.legs[0].segments.length === 1 && a.flight.legs[1].segments.length === 1) 
          || a.flight.legs[0].segments.length + a.flight.legs[1].segments.length === 3);
        } else {
          return data.filter(a => (a.flight.legs[0].segments.length + a.flight.legs[1].segments.length) === 3);
        }
      } 
      
      if (filter.includes("no_change")) {
        if (filter.includes("1_change")) {
          return data.filter(a => (a.flight.legs[0].segments.length + a.flight.legs[1].segments.length) === 3
          || (a.flight.legs[0].segments.length === 1 && a.flight.legs[1].segments.length === 1));
        } else {
          return data.filter(a => a.flight.legs[0].segments.length === 1 && a.flight.legs[1].segments.length === 1);
        }
      }
    } else {
      return data;
    }
  }
  
  function searchPrice(data, minPrice, maxPrice) {
    if (minPrice !== null || maxPrice !== null) {
      if (minPrice !== null) {
        if (maxPrice !== null) {
          return data.filter(a => Number(a.flight.price.total.amount) >= Number(minPrice) && Number(a.flight.price.total.amount) <= Number(maxPrice))
        } else {
          return data.filter(a => Number(a.flight.price.total.amount) >= Number(minPrice));
        }
      } 
      
      if (maxPrice !== null) {
        if (minPrice !== null) {
          return data.filter(a => Number(a.flight.price.total.amount) >= Number(minPrice) && Number(a.flight.price.total.amount) <= Number(maxPrice))
        } else {
          return data.filter(a => Number(a.flight.price.total.amount) <= Number(maxPrice));
        }
      }
    } else {
      return data;
    }
  }

  function searchAirlines(data, airlines) {
    if (airlines.length > 0) {
      let res = [];
      data.forEach(a => airlines.includes(a.flight.carrier.caption) && res.push(a));
      return res;
    } else {
      return data;
    }
  }

  useEffect(() => {
    if (isSorted) {
      let sortedFlights = [...flightsData]
      if (sortingChecked !== null) {
        sortedFlights = sortFlights(sortedFlights, sortingChecked);
      }

      if (filterChecked.length > 0) {
        sortedFlights = filterFlights(sortedFlights, filterChecked);
      }

      if (minPriceChecked !== null || maxPriceChecked !== null) {
        sortedFlights = searchPrice(sortedFlights, minPriceChecked, maxPriceChecked);
      }

      if (airlinesChecked.length > 0) {
        sortedFlights = searchAirlines(sortedFlights, airlinesChecked);
      }
      setFoundFlights(sortedFlights);
    } else {
      setFoundFlights(flightsData);
    }

    
  }, [isSorted, sortingChecked, flightsData, filterChecked, minPriceChecked, maxPriceChecked, airlinesChecked]);

  return (
    <div className={styles.app}>
      <Filters airlines={getAirlines(flightsData)} minPrices={getMinPrices(flightsData)} 
        handleSort={toggleSort} handleFilter={toggleFilter} handleSetPrice={setPriceSearch}
        handleAirlinesSearch={setAirlinesSearch} chosenAirlines={airlinesChecked}
      />
      <FlightsList flightsData={foundFlights} />
    </div>
  );
}

export default App;

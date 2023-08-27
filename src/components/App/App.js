import styles from  './App.module.css';
import Filters from '../Filters/Filters';
import FlightsList from '../FlightsList/FlightsList';

import data from '../../utils/flights.json';

function App() {
  const flightsData = data.result.flights;
  
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
  
  return (
    <div className={styles.app}>
      <Filters airlines={getAirlines(flightsData)} minPrices={getMinPrices(flightsData)}/>
      <FlightsList flightsData={flightsData}/>
    </div>
  );
}

export default App;

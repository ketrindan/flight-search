import flightsListStyles from  './FlightsList.module.css';
import Flight from '../Flight/Flight';

import { useEffect, useState } from 'react';

function FlightsList(props) {
  const [shownFlights, setShownFlights] = useState([]);

  useEffect(() => {
    setShownFlights(props.flightsData.slice(0, 7))
  }, [props.flightsData])

  function handleMoreFlights() {
    setShownFlights(props.flightsData.slice(0, shownFlights.length + 5))
  }

  return (
    <section className={flightsListStyles.flightsList}>
      <section className={flightsListStyles.list}>
        {shownFlights.map((flight) => (
          <Flight key={flight.flightToken} flight={flight}/>
        ))}
      </section>
     {shownFlights.length !== props.flightsData.length && <button className={flightsListStyles.btn} onClick={handleMoreFlights}>Показать еще</button>}
    </section>
  );
}

export default FlightsList;
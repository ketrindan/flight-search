import flightsListStyles from  './FlightsList.module.css';
import Flight from '../Flight/Flight';

function FlightsList() {
  return (
    <section className={flightsListStyles.flightsList}>
      <section className={flightsListStyles.list}>
        <Flight />
        <Flight />
      </section>
      <button className={flightsListStyles.btn}>Показать еще</button>
    </section>
  );
}

export default FlightsList;
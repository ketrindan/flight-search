import styles from  './App.module.css';
import Filters from '../Filters/Filters';
import FlightsList from '../FlightsList/FlightsList';

function App() {
  return (
    <div className={styles.app}>
      <Filters />
      <FlightsList />
    </div>
  );
}

export default App;

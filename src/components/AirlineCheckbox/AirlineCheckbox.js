import airlineCheckboxStyles from './AirlineCheckbox.module.css';

function AirlineCheckbox(props) {
  return (
    <div className={airlineCheckboxStyles.container}>
      <input type="checkbox" name="airline_filter" id="airline1" value="airline" className={airlineCheckboxStyles.filter}/>
      <label htmlFor="airline1" className={airlineCheckboxStyles.label}>{props.airline}</label>
      <span className={airlineCheckboxStyles.span_price}>от {props.price} p.</span>
    </div>
  );
}

export default AirlineCheckbox;
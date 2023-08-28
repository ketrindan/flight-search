import airlineCheckboxStyles from './AirlineCheckbox.module.css';

function AirlineCheckbox(props) {
  return (
    <div className={airlineCheckboxStyles.container}>
      <input type="checkbox" name="airline_filter" id={props.airline} value={props.airline} className={airlineCheckboxStyles.filter} onChange={props.handleChoose}/>
      <label htmlFor={props.airline} className={airlineCheckboxStyles.label}>{props.airline}</label>
      <span className={airlineCheckboxStyles.span_price}>от {props.price} p.</span>
    </div>
  );
}

export default AirlineCheckbox;
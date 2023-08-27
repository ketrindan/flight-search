import flightStyles from  './Flight.module.css';
import image from '../../images/plane.png'

function Flight(props) {  
  function countChange() {
    if (props.flight.flight.legs[0].segments.length === 1) {
      return '';
    } else if (props.flight.flight.legs[0].segments.length === 2) {
      return '1 пересадка';
    } else {
      return 'Более 1 пересадки';
    }
  }

  function countBackChange() {
    if (props.flight.flight.legs[props.flight.flight.legs.length-1].segments.length === 1) {
      return '';
    } else if (props.flight.flight.legs[props.flight.flight.legs.length-1].segments.length === 2) {
      return '1 пересадка';
    } else {
      return 'Более 1 пересадки';
    }
  }

  function convertDuration(duration) {
    const hours = Math.floor(duration/60);
    const minutes = ("0" + (duration - hours*60)).slice(-2);
    return `${hours} ч ${minutes} мин`;
  }

  function getTime(data) {
    return data.slice(-8, -3);
  }

  function getDate(data) {
    const date = data.slice(8, 10);

    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const month = months[Number(data.slice(5, 7))-1];

    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const day = days[new Date(data.slice(0, 10)).getDay()];

    return `${date} ${month}. ${day}`;
  }


  return (
    <article className={flightStyles.flight}>
      <div className={flightStyles.heading}>
        <img src={image} alt='airline logo' className={flightStyles.image}/>
        <div className={flightStyles.priceInfo}>
          <span className={flightStyles.price}>{props.flight.flight.price.total.amount} &#8381;</span>
          <p className={flightStyles.priceText}>Стоимость для одного взрослого пассажира</p>
        </div>
      </div>
      <div className={flightStyles.container}>
        <p className={flightStyles.route}>{props.flight.flight.legs[0].segments[0].departureCity.caption}, {props.flight.flight.legs[0].segments[0].departureAirport.caption} 
          <span className={`${flightStyles.airport} ${flightStyles.airport_mod}`}> ({props.flight.flight.legs[0].segments[0].departureAirport.uid})</span> 
          {props.flight.flight.legs[0].segments[props.flight.flight.legs[0].segments.length-1].arrivalCity.caption}, {props.flight.flight.legs[0].segments[props.flight.flight.legs[0].segments.length-1].arrivalAirport.caption} 
          <span className={flightStyles.airport}> ({props.flight.flight.legs[0].segments[props.flight.flight.legs[0].segments.length-1].arrivalAirport.uid})</span>
        </p>
        <div className={flightStyles.info}>
          <p className={flightStyles.time}>{getTime(props.flight.flight.legs[0].segments[0].departureDate)} 
            <span className={flightStyles.date}> {getDate(props.flight.flight.legs[0].segments[0].departureDate)}</span></p>
          <p className={flightStyles.duration}>{convertDuration(props.flight.flight.legs[0].duration)}</p>
          <p className={flightStyles.time}><span className={flightStyles.date}>{getDate(props.flight.flight.legs[0].segments[props.flight.flight.legs[0].segments.length-1].arrivalDate)} </span> 
            {getTime(props.flight.flight.legs[0].segments[props.flight.flight.legs[0].segments.length-1].arrivalDate)}</p>
        </div>
        <hr className={flightStyles.line} />
        <p className={flightStyles.change}>{countChange()}</p>
        <p className={flightStyles.airline}>Рейс выполняет: {props.flight.flight.carrier.caption}</p>
      </div>
      <hr className={flightStyles.line_blue} />
      <div className={flightStyles.container}>
        <p className={flightStyles.route}>{props.flight.flight.legs[1].segments[0].departureCity.caption}, {props.flight.flight.legs[1].segments[0].departureAirport.caption} 
          <span className={`${flightStyles.airport} ${flightStyles.airport_mod}`}> ({props.flight.flight.legs[1].segments[0].departureAirport.uid})</span>
          {props.flight.flight.legs[1].segments[props.flight.flight.legs[1].segments.length-1].arrivalCity.caption}, {props.flight.flight.legs[1].segments[props.flight.flight.legs[1].segments.length-1].arrivalAirport.caption} 
          <span className={flightStyles.airport}> ({props.flight.flight.legs[1].segments[props.flight.flight.legs[1].segments.length-1].arrivalAirport.uid})</span> 
        </p>
        <div className={flightStyles.info}>
          <p className={flightStyles.time}>{getTime(props.flight.flight.legs[1].segments[0].departureDate)} <span className={flightStyles.date}> {getDate(props.flight.flight.legs[1].segments[0].departureDate)}</span></p>
          <p className={flightStyles.duration}>{convertDuration(props.flight.flight.legs[1].duration)}</p>
          <p className={flightStyles.time}><span className={flightStyles.date}>{getDate(props.flight.flight.legs[1].segments[props.flight.flight.legs[1].segments.length-1].arrivalDate)} </span> {getTime(props.flight.flight.legs[1].segments[props.flight.flight.legs[1].segments.length-1].arrivalDate)}</p>
        </div>
        <hr className={flightStyles.line} />
        <p className={flightStyles.change}>{countBackChange()}</p>
        <p className={flightStyles.airline}>Рейс выполняет: {props.flight.flight.carrier.caption}</p>
      </div>
      <button className={flightStyles.btn}>выбрать</button>
    </article>
  );
}

export default Flight;
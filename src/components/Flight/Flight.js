import flightStyles from  './Flight.module.css';

function Flight() {
  return (
    <article className={flightStyles.flight}>
      <div className={flightStyles.heading}>
        <img src='#' alt='airline logo' />
        <div className={flightStyles.priceInfo}>
          <span className={flightStyles.price}>21049 &#8381;</span>
          <p className={flightStyles.priceText}>Стоимость для одного взрослого пассажира</p>
        </div>
      </div>
      <div className={flightStyles.container}>
        <p className={flightStyles.route}>Москва, ШЕРЕМЕТЬЕВО 
          <span className={`${flightStyles.airport} ${flightStyles.airport_mod}`}> (SVO)</span> 
          ЛОНДОН, Лондон, Хитроу <span className={flightStyles.airport}> (LHR)</span>
        </p>
        <div className={flightStyles.info}>
          <p className={flightStyles.time}>20:40 <span className={flightStyles.date}>18 авг. вт</span></p>
          <p className={flightStyles.duration}>14 ч 45 мин</p>
          <p className={flightStyles.time}><span className={flightStyles.date}>19 авг. ср</span> 09:25</p>
        </div>
        <hr className={flightStyles.line} />
        <p className={flightStyles.change}>1 пересадка</p>
        <p className={flightStyles.airline}>Рейс выполняет: LOT Polish Airlines</p>
      </div>
      <hr className={flightStyles.line_blue} />
      <div className={flightStyles.container}>
        <p className={flightStyles.route}>ЛОНДОН, Лондон, Хитроу <span className={`${flightStyles.airport} ${flightStyles.airport_mod}`}> (LHR)</span>
          Москва, ШЕРЕМЕТЬЕВО <span className={flightStyles.airport}> (SVO)</span> 
        </p>
        <div className={flightStyles.info}>
          <p className={flightStyles.time}>18:10 <span className={flightStyles.date}>19 авг. ср</span></p>
          <p className={flightStyles.duration}>23 ч 35 мин</p>
          <p className={flightStyles.time}><span className={flightStyles.date}>20 авг. чт</span> 19:45</p>
        </div>
        <hr className={flightStyles.line} />
        <p className={flightStyles.change}>1 пересадка</p>
        <p className={flightStyles.airline}>Рейс выполняет: LOT Polish Airlines</p>
      </div>
      <button className={flightStyles.btn}>выбрать</button>
    </article>
  );
}

export default Flight;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { SET_DATES } from "../../store/types";
import Nav from "../Utils/Nav";
import Button from "../Utils/Button";
import InteractiveBackground from "../Utils/InteractiveBackground";
import CalendarHolder from "../Utils/CalendarHolder";
import classes from "./HolidaySchedule.module.css";

interface RootState {
  dates: {
    dateFrom: string;
    dateTo: string;
  };
}

const HolidaySchedule: React.FC = () => {
  const dispatch = useDispatch()
//   const navigate = useNavigate()
  const { dateFrom, dateTo } = useSelector((state: RootState) => state.dates)

  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false)

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const payload = {
        dateFrom: event.target.name === 'dateFrom' ? event.target.value : dateFrom,
        dateTo: event.target.name === 'dateTo' ? event.target.value : dateTo
    }

    dispatch({
      type: SET_DATES,
      payload
    })
  }

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // navigate('/raportowanie/data-urlopu/raport-urlopowy')
    window.open('/raportowanie/data-urlopu/raport-urlopowy', '_blank')
  };

  const handleOpenNewWindow = () => {
    window.open('/kalendarz', '_blank')
  };

  const handleOpenCalendar = () => {
    setIsCalendarOpened(prev => !prev);
  };

  return (
    <>
      <div className={classes['main']}>
        <Nav />
        <section className={classes['holiday-schedule__container']}>
          <div className={classes['holiday-schedule__header']}>
            <h1>Planowanie urlopów</h1>
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className={classes['holiday-schedule__data_container']}>
              <span>Wybierz datę początkową i końcową na które ma zostać wygenerowany raport:</span>
              <div>
                <div className={classes['holiday-schedule__date-container']}>
                  <label>Data od:</label>
                  <input type="date" onChange={handleDate} name="dateFrom" value={dateFrom} required />
                </div>
                <div className={classes['holiday-schedule__date-container']}>
                  <label>Data do:</label>
                  <input type="date" onChange={handleDate} name="dateTo" value={dateTo} required />
                </div>
              </div>
            </div>
            <div className={classes['holiday-schedule__button_container']}>
              <Button type="submit" text="Pokaz kalendarz urlopowy" onClick={handleOpenCalendar} />
              <Button type="button" text="Wykonaj" onClick={handleOpenNewWindow} />
            </div>
          </form>
          {isCalendarOpened && <CalendarHolder />}
        </section>
        <InteractiveBackground />
      </div>
    </>
  );
};

export default HolidaySchedule;

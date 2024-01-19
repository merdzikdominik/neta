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
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { dateFrom, dateTo } = useSelector((state: RootState) => state.dates);

  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    dispatch({
      type: SET_DATES,
      payload: {
        dateFrom: name === 'dateFrom' ? value : dateFrom,
        dateTo: name === 'dateTo' ? value : dateTo
      }
    });
  };

  const handleAddHoliday = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/add_holiday', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateFrom,
          dateTo
        }),
      });

      if (response.ok) {
        console.log('Urlop dodany pomyślnie');
        const data = await response.json()

        console.log(data)
        // navigate('/raportowanie/data-urlopu/raport-urlopowy');
      } else {
        const errorData = await response.json();
        console.error('Błąd przy dodawaniu urlopu:', errorData);
      }
    } catch (error) {
      console.error('Błąd przy wysyłaniu żądania', error);
    }
  };

  const handleOpenCalendar = () => {
    setIsCalendarOpened(prev => !prev);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddHoliday();
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
              <Button type="button" text="Wyświetl w kalendarzu" onClick={handleOpenCalendar} />
              <Button type="submit" text="Wykonaj" />
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

import React, { useState, useEffect } from "react";
// import { IHolidayRequest } from "../Utils/CalendarHolder";
import { IHolidayRequest } from "../Admin/AdminModule";
import Nav from "../Utils/Nav";
import Button from "../Utils/Button";
import Background from "../Utils/Background";
import CalendarHolder from "../Utils/CalendarHolder";
import classes from "./HolidaySchedule.module.css";

export interface IDates {
  dateFrom: string,
  dateTo: string,
}

const HolidaySchedule: React.FC = () => {
  const [dates, setDates] = useState<IDates>({dateFrom: '', dateTo: ''})
  const [holidayRequests, setHolidayRequests] = useState<IHolidayRequest[]>([])
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const { name, value } = event.target

    const { dateFrom, dateTo } = dates

    setDates({
      dateFrom: name === 'dateFrom' ? value : dateFrom,
      dateTo: name === 'dateTo' ? value : dateTo
    })
  }

  const handleAddHoliday = async () => {
    const token = localStorage.getItem('authToken')

    if (token) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/all_holiday_plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dateFrom: dates.dateFrom,
            dateTo: dates.dateTo
          }),
        });
  
        if (response.ok) {
          console.log('Plan urlopowy dodany pomyślnie');
          const data = await response.json()
  
          console.log(data)
  
        } else {
          const errorData = await response.json();
          console.error('Błąd przy dodawaniu planu urlopowego:', errorData);
        }
      } catch (error) {
        console.error('Błąd przy wysyłaniu żądania', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken')
  
      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/all_holiday_plans', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
          })
  
          if (response.ok) {
            const data = await response.json();
            setHolidayRequests(data);
          } else {
            console.error('Błąd podczas pobierania dat');
          }
        } catch (error) {
          console.error('Błąd podczas pobierania dat', error);
        }
      };
    }

    fetchData()
  }, [holidayRequests])

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
                  <input type="date" onChange={handleDate} name="dateFrom" value={dates.dateFrom} required />
                </div>
                <div className={classes['holiday-schedule__date-container']}>
                  <label>Data do:</label>
                  <input type="date" onChange={handleDate} name="dateTo" value={dates.dateTo} required />
                </div>
              </div>
            </div>
            <div className={classes['holiday-schedule__button_container']}>
              <Button type="button" background="white" text="Wyświetl w kalendarzu" onClick={handleOpenCalendar} />
              <Button type="submit" background="white" text="Wykonaj" />
            </div>
          </form>
          {isCalendarOpened && <CalendarHolder holidayDataProp={holidayRequests} backgroundColor="none"/>}
        </section>
        <Background />
      </div>
    </>
  );
};

export default HolidaySchedule;

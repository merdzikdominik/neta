import React, { useState, useEffect } from 'react'
import { IDates } from '../Reports/HolidaySchedule';
import Nav from "../Utils/Nav";
import Background from '../Utils/Background';
import CalendarHolder from '../Utils/CalendarHolder';
import classes from './HolidayYearPlans.module.scss'

const HolidayYearPlans: React.FC = () => {
    const [holidayPlans, setHolidayPlans] = useState<IDates[]>([{dateFrom: '', dateTo: ''}])

    useEffect(() => {
        const fetchHolidayPlans = async () => {
            const token = localStorage.getItem('authToken')

            if (token) {
                try {
                  const response = await fetch('http://127.0.0.1:8000/api/all_holiday_plans', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                  });
            
                  if (response.ok) {
                    const data = await response.json()
            
                    setHolidayPlans(data)
            
                  } else {
                    const errorData = await response.json();
                    console.error('Nie wczytano planow urlopowych:', errorData);
                  }
                } catch (error) {
                  console.error('Błąd przy wysyłaniu żądania', error);
                }
            }
        };

        fetchHolidayPlans()
    }, [])

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holidayYearPlans__container']}>
                <CalendarHolder holidayDataProp={holidayPlans}/>
            </section>
            <Background />
        </div>
    )
}

export default HolidayYearPlans
import React, { useState, useEffect } from "react"
import CalendarHolder from "../Utils/CalendarHolder"
import classes from './HolidayApprovedRequests.module.scss'
import { IHolidayRequest, IRequestUser } from "../Admin/AdminModule"

export interface IHoliday {
    dateFrom: string,
    dateTo: string,
    user: IRequestUser,
}

const HolidayApprovedRequests: React.FC = () => {
    const [approvedDates, setApprovedDates] = useState<IHoliday[]>([{ dateFrom: '', dateTo: '', user: { first_name: '', last_name: '', email: '' } }])

    useEffect(() => {
        const fetchHolidayPlans = async () => {
            const token = localStorage.getItem('authToken');

            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/list_holiday_approved_requests', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`,
                        },
                    });

                    if (response.ok) {
                        console.log('Wczytano zatwierdzone wnioski urlopowe');
                        const data = await response.json();

                        const approvedDates = data.map((holiday: IHolidayRequest) => {
                            const { start_date, end_date, user } = holiday

                            return {dateFrom: start_date, dateTo: end_date, user}
                        });

                        setApprovedDates(approvedDates)

                    } else {
                        const errorData = await response.json();
                        console.error('Nie wczytano zatwierdzonych wnioskow urlopowych:', errorData);
                    }
                } catch (error) {
                    console.error('Błąd przy wysyłaniu żądania', error);
                }
            }
        };

        fetchHolidayPlans();
    }, []);

    return (        
        <div className={classes['main']}>
            <section className={classes['holidayApprovedRequests__container']}>
                <CalendarHolder holidayDataProp={approvedDates}/>
            </section>
        </div>
    )
};

export default HolidayApprovedRequests;

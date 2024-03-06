import React, { useState, useEffect } from "react"
import { IDates } from "../Reports/HolidaySchedule"
import Nav from "../Utils/Nav"
import InteractiveBackground from "../Utils/InteractiveBackground"
import CalendarHolder from "../Utils/CalendarHolder"
import classes from './HolidayRequestList.module.scss'
import { IHolidayRequest, IRequestUser } from "../Admin/AdminModule"

interface IHoliday {
    start_date: string,
    end_date: string,
    user: IRequestUser
}

const HolidayApprovedRequests: React.FC = () => {
    const [approvedHoliday, setApprovedHoliday] = useState<IHolidayRequest[]>([]);
    const [approvedDates, setApprovedDates] = useState<IHoliday[]>([{ start_date: '', end_date: '', user: { first_name: '', last_name: '', email: '' } }])

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
                        setApprovedHoliday(data);
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

    useEffect(() => {
        const approvedDates = approvedHoliday.map((holiday) => {
            const { start_date, end_date, user } = holiday

            return {start_date, end_date, user}
        });

        setApprovedDates(approvedDates);
    }, [approvedHoliday]);

    console.log(approvedDates)

    return <></>;
};

export default HolidayApprovedRequests;

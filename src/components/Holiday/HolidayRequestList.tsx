import React, { useState, useEffect } from "react"
import Nav from "../Utils/Nav"
import Background from "../Utils/Background"
import ListRow from "../Utils/HolidayRequestListRow"
import classes from './HolidayRequestList.module.scss'
import { IHolidayRequest } from "../Admin/AdminModule"

const HolidayRequestList: React.FC = () => {
    const [holidayRequests, setHolidayRequests] = useState<IHolidayRequest[]>([])

    useEffect(() => {
        const fetchUserHolidayRequests = async () => {
            const token = localStorage.getItem('authToken')

            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/user_holiday_requests', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`,
                        },
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
                }
            }
        fetchUserHolidayRequests()
    }, [])

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holidayRequestList__container']}>
                <div className={classes['holidayRequestList__header']}>
                    <h1>Twoje wnioski urlopowe</h1>
                </div>
                <div className={classes['holidayRequestList__data_container']}>
                    <div className={classes['holidayRequestList__content']}>
                        {holidayRequests.length === 0 
                        ? <div className={classes['holidayRequestList__no-requests-container']}><span>BRAK WNIOSKOW URLOPOWYCH</span></div> 
                        : holidayRequests.map(request => (
                            <ListRow 
                                key={request.id}
                                userInfo={request.user}
                                requestInfo={request}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <Background />
        </div>
    )
}

export default HolidayRequestList
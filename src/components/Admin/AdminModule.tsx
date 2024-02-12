import React, { useState, useEffect } from "react"
import { Chart } from "react-google-charts"
import Nav from "../Utils/Nav"
import InteractiveBackground from "../Utils/InteractiveBackground"
import classes from './AdminModule.module.scss'

interface IUser {
    first_name: string
    last_Name: string
    email: string
}
interface IHolidayRequest {
    id: string
    approved: boolean
    created_at: string
    difference_in_days: number
    start_date: string
    end_date: string
    message: string
    selected_holiday_type: string
    user: IUser
}

const OPTIONS = {
    title: "Najczęściej Wybierane Urlopy",
    is3D: true,
}

const AdminModule: React.FC = () => {
    const [requestsList, setRequestsList] = useState<IHolidayRequest[]>([]);
    const [holidayRequestData, setHolidayRequestData] = useState<(string | number)[][]>([]);


    const fetchRequests = async () => {
        const token = localStorage.getItem('authToken');
    
        if (token) {
          try {
            if (token) {}
              const response = await fetch('http://127.0.0.1:8000/api/list_holiday_requests', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`,
                },
              });
              if (response.ok) {
                const data = await response.json();

                console.log(data)
                setRequestsList(data);
              } else {
                console.error('Błąd podczas pobierania dat');
              }
          } catch (error) {
              console.error('Błąd podczas pobierania dat', error);
          }
        }
    };
    
    useEffect(() => {
        fetchRequests()
    }, [])

    useEffect(() => {
        if (requestsList.length > 0) {
            const countHolidayTypes = (requests: IHolidayRequest[]): (string | number)[][] => {
                const typeCounts: Record<string, number> = {};
      
                requests.forEach((request) => {
                    const holidayType = request.selected_holiday_type;
      
                    if (typeCounts[holidayType]) {
                        typeCounts[holidayType]++;
                    } else {
                        typeCounts[holidayType] = 1;
                    }
                });
      
                const labels = Object.keys(typeCounts);
                const values = Object.values(typeCounts);

                const data = labels.map((label, index) => [label, values[index]]);

                setHolidayRequestData([["Typ urlopu", "Ilość"], ...data]);

                return data;
            };

            countHolidayTypes(requestsList);
        }
    }, [requestsList]);

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['adminModule__container']}>
                <div className={classes['adminModule__grid-container']}>
                    <div className={classes['adminModule__left-grid-column']}>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Lista wniosków urlopowych</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Zatwierdzanie wniosków</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Statystyki urlopów</span></div>
                    </div>
                    <div className={classes['adminModule__right-grid-column']}>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Zarządzanie rodzajami urlopów</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Powiadomienia</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Eksport Danych</span></div>
                    </div>
                </div>
                <div className={classes['adminModule__charts-container']}>
                    <Chart 
                        chartType="PieChart"
                        data={holidayRequestData}
                        options={OPTIONS}
                        width={"90%"}
                        height={"400px"}
                        style={{ margin: "0 auto" }}
                    />
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default AdminModule

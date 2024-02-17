import React, { useState, useEffect } from "react"
import { Chart } from "react-google-charts"
import Nav from "../Utils/Nav"
import InteractiveBackground from "../Utils/InteractiveBackground"
import Spinner from "../Utils/Loader"
import Modal from "../Utils/Modal"
import { ToastContainer } from "react-toastify"
import classes from './AdminModule.module.scss'

export interface IUser {
    first_name: string
    last_name: string
    email: string
}
export interface IHolidayRequest {
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

const OPTIONS_PIE_CHART = {
    title: "Najczęściej Wybierane Urlopy",
    is3D: true,
    pieSliceText: 'percentage',
    // pieSliceTextStyle: { fontSize: 10 },
    chartArea: {
        left: 10,
        top: 10,
        width: '90%',
        height: '80%',
    }
}

const OPTIONS_BAR_CHART = {
    title: "Najchętniej Wybierany Miesiąc Urlopu",
    bar: { groupWidth: "95%" },
    borderRadius: 40,
    legend: { position: "none" },
}

const MONTHS = [
    [ '01', 'Styczeń', '#FF8F00' ],
    [ '02', 'Luty', '#e5e4e2' ],
    [ '03', 'Marzec', '#7CFF00' ],
    [ '04', 'Kwiecień', '#00FFF7' ],
    [ '05', 'Maj', '#004DFF' ],
    [ '06', 'Czerwiec', '#8F00FF' ],
    [ '07', 'Lipiec', '#F700FF' ],
    [ '08', 'Sierpień', '#FF008F' ],
    [ '09', 'Wrzesień', '#FF0000' ],
    [ '10', 'Październik', '#FFF148' ],
    [ '11', 'Listopad', '#909DB9' ],
    [ '12', 'Grudzień', '#14526D' ],
]

const AdminModule: React.FC = () => {
    const [requestsList, setRequestsList] = useState<IHolidayRequest[]>([])
    const [holidayRequestData, setHolidayRequestData] = useState<(string | number)[][]>([])
    const [mostOccupiedMonths, setMostOccupiedMonths] = useState<[string, number, string, null][]>([])
    const [isRequestsModalOpen, setIsRequestModalOpen] = useState<boolean>(false)

    const fetchRequests = async () => {
        const token = localStorage.getItem('authToken')
    
        if (token) {
          try {
              const response = await fetch('http://127.0.0.1:8000/api/list_holiday_requests', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`,
                },
              });
              if (response.ok) {
                const data = await response.json();

                setRequestsList(data);
              } else {
                console.error('Błąd podczas pobierania dat');
              }
          } catch (error) {
              console.error('Błąd podczas pobierania dat', error);
          }
        }
    }

    const toggleModal = () => {
        setIsRequestModalOpen(prev => !prev)

        return isRequestsModalOpen
    }
    
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

    useEffect(() => {
        const monthCounts: Record<string, number> = {};
      
        requestsList.forEach((request) => {
            const { start_date } = request;
            const startDateMonth = start_date.split('-')[1];
        
            if (monthCounts[startDateMonth]) {
                monthCounts[startDateMonth]++;
            } else {
                monthCounts[startDateMonth] = 1;
            }
        });
      
        const result: [string, number, string, null][] = Object.entries(monthCounts).map(([month, count]) => {
            const monthData = MONTHS.find((m) => m[0] === month);
        
            return monthData ? [monthData[1], count, monthData[2], null] : ['', 0, '', null];
        });
      
        setMostOccupiedMonths(result);
    }, [requestsList]);

    useEffect(() => {
        console.log(mostOccupiedMonths)
    }, [mostOccupiedMonths])

    const barChartData = [
        ["Element", "Density", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify" }],
        ...mostOccupiedMonths
    ]

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['adminModule__container']}>
                <div className={classes['adminModule__grid-container']}>
                    <div className={classes['adminModule__left-grid-column']}>
                        <div className={classes['adminModule__exmaple-blocks']} onClick={() => setIsRequestModalOpen(true)}><span>Lista wniosków urlopowych</span></div>
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
                    <div className={classes['chart-container']}>
                        <Chart 
                            chartType="PieChart"
                            data={holidayRequestData}
                            options={OPTIONS_PIE_CHART}
                            width="100%"
                            height="100%"
                            loader={<Spinner />}
                            style={{ margin: "0 auto" }}
                        />
                    </div>
                    <div className={classes['chart-container']}>
                        <Chart
                            chartType="BarChart"
                            data={barChartData}
                            options={OPTIONS_BAR_CHART}
                            width="100%"
                            height="100%"
                            loader={<Spinner />}
                            style={{ margin: "0 auto" }}
                        />
                    </div>
                </div>
                <ToastContainer />
            </section>
            <InteractiveBackground />
            {isRequestsModalOpen && (
                <Modal modalTitle={'Lista wniosków urlopowych'} modalContent={requestsList} toggleModal={toggleModal} />
            )}
        </div>
    )
}

export default AdminModule

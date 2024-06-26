import React, { useState, useEffect } from "react"
import { Chart } from "react-google-charts"
import { toast } from "react-toastify"
import { INotification } from "../../store/types"
import { IUserInfo } from "../EmployeeFile/EmployeeFileData"
import { IUserDataChangeNotification } from "../Utils/Modal"
import { motion } from "framer-motion"
import * as ExcelJS from 'exceljs'
import Nav from "../Utils/Nav"
import Background from "../Utils/Background"
import Spinner from "../Utils/Loader"
import Modal from "../Utils/Modal"
import classes from './AdminModule.module.scss'

export interface IUser {
    id: number
    age: number | null
    birth_date: string | null
    education: string | null
    email: string
    employment_end_date: string | null
    employment_start_date: string | null
    first_name: string
    is_active: boolean
    is_staff: boolean
    is_superuser: boolean
    last_login: string
    last_name: string
    mobile_number: string | null
    password: string
    role: string | null
    second_name: string | null
    groups?: []
    user_permissions?: []
}

export interface IRequestUser {
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
    user: IRequestUser,
    color_hex: string
}

export interface IHolidayType {
    id: string
    label: string
}

interface IUserData {
    age: number | null;
    annual_settlement_address: string;
    birth_date: string | null;
    city_correspondence: string;
    city_permanent_residence: string;
    city_second_residence: string;
    correspondence_address: string;
    country_correspondence: string;
    country_permanent_residence: string;
    country_second_residence: string;
    education: string | null;
    email: string;
    employment_end_date: string | null;
    employment_start_date: string | null;
    first_name: string;
    flat_number_correspondence: string;
    flat_number_permanent_residence: string;
    flat_number_second_residence: string;
    groups?: any[];
    house_number_correspondence: string;
    house_number_permanent_residence: string;
    house_number_second_residence: string;
    id: number;
    id_data: string;
    id_date: string;
    id_given_by: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    last_name: string;
    mobile_number_correspondence: string;
    mobile_number_permanent_residence: string;
    mobile_number_second_residence: string;
    municipal_commune_correspondence: string;
    municipal_commune_permanent_residence: string;
    municipal_commune_second_residence: string;
    nfz_branch: string;
    password: string;
    post_correspondence: string;
    post_permanent_residence: string;
    post_second_residence: string;
    postal_code_correspondence: string;
    postal_code_permanent_residence: string;
    postal_code_second_residence: string;
    role?: string | null;
    second_name: string | null;
    street_correspondence: string;
    street_permanent_residence: string;
    street_second_residence: string;
    tax_office: string;
    user_permissions?: any[];
    voivodeship_correspondence: string;
    voivodeship_permanent_residence: string;
    voivodeship_second_residence: string;
}


const OPTIONS_PIE_CHART = {
    title: "Najczęściej Wybierane Urlopy",
    is3D: true,
    pieSliceText: 'percentage',
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
    const [requestsList, setRequestsList] = useState<IHolidayRequest[] | []>([])
    const [holidayPlansList, setHolidayPlansList] = useState<IHolidayRequest[] | []>([])
    const [users, setUsers] = useState<IUserInfo[] | []>([])
    const [holidayRequestData, setHolidayRequestData] = useState<(string | number)[][]>([])
    const [mostOccupiedMonths, setMostOccupiedMonths] = useState<[string, number, string, null][]>([])
    const [holidayTypes, setHolidayTypes] = useState<IHolidayType[]>([])
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [userDataChangeRequests, setIsUserDataChangeRequests] = useState<IUserDataChangeNotification[]>([])
    const [isRequestsModalOpen, setIsRequestModalOpen] = useState<boolean>(false)
    const [isHolidayPlansModalOpen, setIsHolidayPlansModalOpen] = useState<boolean>(false)
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
    const [isUsersModalOpen, setIsUsersModalOpen] = useState<boolean>(false)
    const [isHolidayTypeModalOpen, setIsHolidayTypeModalOpen] = useState<boolean>(false)
    const [isHolidayNotificationModalOpen, setIsHolidayNotificationModalOpen] = useState<boolean>(false)
    const [isUserDataChangeNotificationModalOpen, setIsUserDataChangeNotificationModalOpen] = useState<boolean>(false)
    const [shouldAnimate, setShouldAnimate] = useState<boolean>(true);

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

                if (data.length === 0) {
                    toast.info('Nie ma wniosków do pobrania.')
                    return
                } else {
                    setRequestsList(data)
                }
              } else {
                toast.error('Błąd podczas pobierania wniosków')
                console.error('Błąd podczas pobierania wniosków');
              }
          } catch (error) {
                toast.error('Błąd podczas pobierania wniosków')
                console.error('Błąd podczas pobierania wniosków', error);
          }
        }
    }

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
                  const data = await response.json();
  
                  if (data.length === 0) {
                      toast.info('Nie ma wniosków do pobrania.')
                      return
                  } else {
                    setHolidayPlansList(data)
                  }
                } else {
                  toast.error('Błąd podczas pobierania wniosków')
                  console.error('Błąd podczas pobierania wniosków');
                }
            } catch (error) {
                  toast.error('Błąd podczas pobierania wniosków')
                  console.error('Błąd podczas pobierania wniosków', error);
            }
        }
    }

    const fetchUsers = async () => {
        const token = localStorage.getItem('authToken')

        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/all_users', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`,
                },
              });
              if (response.ok) {
                const usersData = await response.json();
                setUsers(usersData)

              } else {
                console.error('Błąd podczas pobierania uzytkowników');
              }
            } catch (error) {
                console.error('Błąd podczas pobierania uzytkowników');
            }
        }

    }

    const fetchHolidayTypes = async () => {
        const token = localStorage.getItem('authToken')

        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/all_holiday_types', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`,
                },
              });
              if (response.ok) {
                const data = await response.json();

                setHolidayTypes(data)

              } else {
                console.error('Błąd podczas pobierania typów urlopowych');
              }
            } catch (error) {
                console.error('Błąd podczas pobierania typów urlopowych');
            }
        }
    }

    const fetchNotifications = async () => {
        const token = localStorage.getItem('authToken');
    
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/all_notifications', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data)
                } else {
                    console.error('Błąd podczas pobierania powiadomień')
                }
            } catch (error) {
                console.error`Błąd podczas pobierania powiadomień: ${error}`;

            }
        }
    };

    const fetchUserDataChangeRequests = async () => {
        const token = localStorage.getItem('authToken')

        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/all_data_change_requests', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                });
    
                if (!response.ok) {
                    toast.error('Wystąpił bład podczas pobierania Twoich danych.')
                    throw new Error(`Błąd pobierania danych użytkownika: ${response.statusText}`);
                }

                const dataChangeRequests = await response.json()

                setIsUserDataChangeRequests(dataChangeRequests)

            } catch(e) {
                console.error(`wystapil blad ${e}`)
            }
        }
    }

    const clearHolidayNotifications = async () => {
        const token = localStorage.getItem('authToken')

        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/all_notifications', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                })

                if (response.ok) {
                    setNotifications([])
                    console.log('Usunieto wszystkie powiadomienia.')
                } else {
                    console.error('Nie udalo sie usunac powiadomien.')
                }

            } catch (error) {
                console.error('Wystapil blad podczas usuwania powiadomien.')
            }
        }
    }

    const handleHolidayNotificationsModal = () => {
        setIsHolidayNotificationModalOpen(!isHolidayNotificationModalOpen)

        if (notifications.length > 0) clearHolidayNotifications()

    }

    const handleUserDataChangeNotificationsModal = () => {
        setIsUserDataChangeNotificationModalOpen(!isUserDataChangeNotificationModalOpen)
    }

    const handleHolidayPlansModal = () => {
        setIsHolidayPlansModalOpen(!holidayPlansList)
    }


    useEffect(() => {
        fetchUserDataChangeRequests()
    }, [])

    useEffect(() => {
        console.log(userDataChangeRequests)
    }, [userDataChangeRequests])

    const exportToExcel = async (requests: IHolidayRequest[], users: IUserData[]) => {
        const workbook = new ExcelJS.Workbook();
        const holidayRequestsWorksheet = workbook.addWorksheet('Wnioski_Urlopowe');
        const usersDataWorksheet = workbook.addWorksheet('Dane uzytkowników');
        
        const holidayRequestsColumns = [
            'ID',
            'Approved',
            'Created At',
            'Difference in Days',
            'Start Date',
            'End Date',
            'Message',
            'User First Name',
            'User Last Name',
            'User Email'
        ];
    
        const usersDataColumns: string[] = [
            'ID',
            'first_name',
            'second_name',
            'last_name',
            'birth_date',
            'email',
            'age',
            'employment_start_date',
            'employment_end_date',
            'role',
            'education',
            'city_permanent_residence',
            'postal_code_permanent_residence',
            'post_permanent_residence',
            'municipal_commune_permanent_residence',
            'voivodeship_permanent_residence',
            'country_permanent_residence',
            'street_permanent_residence',
            'house_number_permanent_residence',
            'flat_number_permanent_residence',
            'mobile_number_permanent_residence',
            'city_second_residence',
            'postal_code_second_residence',
            'post_second_residence',
            'municipal_commune_second_residence',
            'voivodeship_second_residence',
            'country_second_residence',
            'correspondence_address',
            'street_second_residence',
            'house_number_second_residence',
            'flat_number_second_residence',
            'mobile_number_second_residence',
            'city_correspondence',
            'postal_code_correspondence',
            'post_correspondence',
            'municipal_commune_correspondence',
            'voivodeship_correspondence',
            'country_correspondence',
            'street_correspondence',
            'house_number_correspondence',
            'flat_number_correspondence',
            'mobile_number_correspondence',
            'tax_office',
            'annual_settlement_address',
            'nfz_branch',
            'id_data',
            'id_given_by',
            'id_date',
            'is_superuser',
            'last_login',
        ];
    
        holidayRequestsWorksheet.addRow(holidayRequestsColumns);
        usersDataWorksheet.addRow(usersDataColumns);

        requests.forEach((item) => {
            const row = [
                item.id,
                item.approved,
                item.created_at,
                item.difference_in_days,
                item.start_date,
                item.end_date,
                item.message,
                item.user.first_name,
                item.user.last_name,
                item.user.email
            ];
    
            holidayRequestsWorksheet.addRow(row);
        });
    
        // Dodaj dane użytkowników
        users.forEach((user) => {
            const row = [
                user.id,
                user.first_name,
                user.second_name,
                user.last_name,
                user.birth_date,
                user.email,
                user.age,
                user.employment_start_date,
                user.employment_end_date,
                user.role,
                user.education,
                user.city_permanent_residence,
                user.postal_code_permanent_residence,
                user.post_permanent_residence,
                user.municipal_commune_permanent_residence,
                user.voivodeship_permanent_residence,
                user.country_permanent_residence,
                user.street_permanent_residence,
                user.house_number_permanent_residence,
                user.flat_number_permanent_residence,
                user.mobile_number_permanent_residence,
                user.city_second_residence,
                user.postal_code_second_residence,
                user.post_second_residence,
                user.municipal_commune_second_residence,
                user.voivodeship_second_residence,
                user.country_second_residence,
                user.correspondence_address,
                user.street_second_residence,
                user.house_number_second_residence,
                user.flat_number_second_residence,
                user.mobile_number_second_residence,
                user.city_correspondence,
                user.postal_code_correspondence,
                user.post_correspondence,
                user.municipal_commune_correspondence,
                user.voivodeship_correspondence,
                user.country_correspondence,
                user.street_correspondence,
                user.house_number_correspondence,
                user.flat_number_correspondence,
                user.mobile_number_correspondence,
                user.tax_office,
                user.annual_settlement_address,
                user.nfz_branch,
                user.id_data,
                user.id_given_by,
                user.id_date,
                user.is_superuser,
                user.last_login
            ];
    
            usersDataWorksheet.addRow(row);
        });
    
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Wnioski_Urlopowe_i_Dane_Uzytkownikow.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    

    const handleToggleModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prev => !prev)
    }
    
    useEffect(() => {
        fetchRequests()
    }, [])

    useEffect(() => {
        fetchHolidayPlans()
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        fetchHolidayTypes()
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
        fetchNotifications()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldAnimate(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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
    
    const barChartData = [
        ["Urlop", "Częstość", { role: "style" }, { sourceColumn: 0, role: "annotation", type: "string", calc: "stringify" }],
        ...mostOccupiedMonths
    ]

    return (
        <motion.div
            initial={{ scale: 1 }}
            animate={shouldAnimate ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className={classes['main']}>
                <Nav />
                <section className={classes['adminModule__container']}>
                    <div className={classes['adminModule__grid-container']}>
                        <div className={classes['adminModule__left-grid-column']}>
                            <div className={classes['adminModule__exmaple-blocks']} onClick={() => setIsRequestModalOpen(true)}><span>Lista wniosków urlopowych</span></div>
                            <div className={classes['adminModule__exmaple-blocks']} onClick={() => setIsUsersModalOpen(true)}><span>Lista uzytkownikow</span></div>
                        </div>
                        <div className={classes['adminModule__right-grid-column']}>
                            <div className={classes['adminModule__exmaple-blocks']} onClick={() => setIsHolidayTypeModalOpen(true)}><span>Zarządzanie rodzajami urlopów</span></div>
                            <div className={`${classes['adminModule__exmaple-blocks-notifications']} ${notifications.length > 0 ? classes['visible'] : classes['hidden'] }`} onClick={() => setIsHolidayNotificationModalOpen(true)}>
                                <span>Powiadomienia</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes['adminModule__excel-button-container']}>
                        <div className={classes['adminModule__excel-button']} onClick={() => setIsExportModalOpen(true)}><span>Eksport danych dla HR</span></div>
                        <div className={classes['adminModule__excel-button']} onClick={() => setIsHolidayPlansModalOpen(true)}><span>Lista planów urlopowych</span></div>
                        <div className={classes['adminModule__excel-button']} onClick={() => setIsUserDataChangeNotificationModalOpen(true)}><span>Wnioski uzytkowników o zmianę danych ewidencyjnych</span></div>
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
                </section>
                <Background />
                {isRequestsModalOpen && (
                    <Modal modalTitle={'Lista wniosków urlopowych'} modalContent={requestsList} toggleModal={() => handleToggleModal(setIsRequestModalOpen)} />
                )}
                {isExportModalOpen && (
                    <Modal modalTitle={'Tryb eksportu wniosków urlopowych dla HR'} modalContent={requestsList} toggleModal={() => handleToggleModal(setIsExportModalOpen)} handleExcel={() => exportToExcel(requestsList, users as IUserData[])} />
                )}
                {isUsersModalOpen && (
                    <Modal modalTitle={'Lista uzytkowników w systemie'} modalContent={users} toggleModal={() => handleToggleModal(setIsUsersModalOpen)} />
                )}
                {isHolidayTypeModalOpen && (
                    <Modal modalTitle={'Rodzaje urlopów'} modalContent={holidayTypes} toggleModal={() => handleToggleModal(setIsHolidayTypeModalOpen)} />
                )}
                {isHolidayNotificationModalOpen && (
                    <Modal modalTitle={'Powiadomienia'} modalContent={notifications} toggleModal={handleHolidayNotificationsModal} />
                )}
                {isUserDataChangeNotificationModalOpen && (
                    <Modal modalTitle={'Wnioski uzytkowników o zmianę danych ewidencyjnych'} modalContent={userDataChangeRequests} toggleModal={handleUserDataChangeNotificationsModal} />
                )}
                {isHolidayPlansModalOpen && (
                    <Modal modalTitle={'Lista planów urlopowych'} modalContent={holidayPlansList} toggleModal={handleHolidayPlansModal} />
                )}
            </div>
        </motion.div>
    )
}

export default AdminModule
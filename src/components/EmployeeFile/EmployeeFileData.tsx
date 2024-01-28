import React, { useEffect, useState } from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './EmployeeFileData.module.scss'

interface IUserInfo {
    user: {
      first_name: string,
      second_name: string,
      last_name: string,
      birth_date: string,
      mobile_number: string,
      email: string,
      age: number,
      employment_start_date: string,
      employment_end_date: string,
      role: string,
      education: string
    }
  }

const EmployeeFileData: React.FC = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        user: {
            first_name: '',
            second_name: '',
            last_name: '',
            birth_date: '',
            mobile_number: '',
            email: '',
            age: 0,
            employment_start_date: '',
            employment_end_date: '',
            role: '',
            education: ''
        }
    })

    const fetchUserData = async () => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user', {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                })
    
                if (!response.ok) {
                    throw new Error(`Błąd pobierania danych użytkownika: ${response.statusText}`);
                }
        
                const userData = await response.json();
    
                setUserInfo({
                    user: {
                        first_name: userData.first_name,
                        second_name: userData.second_name,
                        last_name: userData.last_name,
                        birth_date: userData.birth_date,
                        mobile_number: userData.mobile_number,
                        email: userData.email,
                        age: userData.age,
                        employment_start_date: userData.employment_start_date,
                        employment_end_date: userData.employment_end_date,
                        role: userData.role,
                        education: userData.education,
                    }
                })
    
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Błąd:', error.message);
                } else {
                    console.error('Nierozpoznany błąd:', error);
                }
            } 
        }

    };

    useEffect(() => {
        fetchUserData()
    }, [])

    // const exampleData = [
    //     {id: 1, field: "Imię", content: "Dominik"},
    //     {id: 2, field: "Drugię Imię", content: "Rafał"},
    //     {id: 3, field: "Nazwisko", content: "Merdzik"},
    //     {id: 4, field: "Data Urodzenia", content: "28.11.1998"},
    //     {id: 5, field: "Nr Telefonu", content: "+48511210172"},
    //     {id: 6, field: "Adres Email", content: "dominik.merdzik@onet.pl"},
    //     {id: 7, field: "Wiek", content: "25 lat"},
    //     {id: 8, field: "Data Zatrudnienia", content: "20.02.2023"},
    //     {id: 9, field: "Data Rozwiązania Umowy", content: "10.03.2023"},
    //     {id: 10, field: "Stanowisko", content: "IT Support Engineer"},
    //     {id: 11, field: "Wykształcenie", content: "Inżynier"},
    // ]

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['employeeFileData__container']}>
                <div className={classes['employeeFileData__header']}>
                    <h1>Kartoteka Pracownika</h1>
                </div>
                <div className={classes['employeeFileData__data_container']}>
                    {Object.entries(userInfo.user).map(([field, content]) => (
                        <div key={field} className={classes['employeeFileData__element']}>
                        <span className={classes['employeeFileData__field']}>{field}: </span>
                        <span className={classes['employeeFileData__content']}>{content}</span>
                        </div>
                    ))}
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default EmployeeFileData
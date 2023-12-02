import React from 'react'
import classes from './EmployeeFileData.module.scss'
import Nav from '../Utils/Nav'

const EmployeeFileData: React.FC = () => {
    // const exampleData = [{
    //     content: "Dominik",
    //     secondName: "Rafał",
    //     lastName: "Merdzik",
    //     birthDate: "28.11.1998",
    //     phone: "+48511210172",
    //     emailAddress: "dominik.merdzik@onet.pl",
    //     age: "25 lat",
    //     employmentDate: "20.02.2023",
    //     contractTerminationDate: "10.03.2023",
    //     role: "IT Support Engineer",
    //     education: "Inżynier"
    // }]

    const exampleData = [
        {id: 1, field: "Imię", content: "Dominik"},
        {id: 2, field: "Drugię Imię", content: "Rafał"},
        {id: 3, field: "Nazwisko", content: "Merdzik"},
        {id: 4, field: "Data Urodzenia", content: "28.11.1998"},
        {id: 5, field: "Nr Telefonu", content: "+48511210172"},
        {id: 6, field: "Adres Email", content: "dominik.merdzik@onet.pl"},
        {id: 7, field: "Wiek", content: "25 lat"},
        {id: 8, field: "Data Zatrudnienia", content: "20.02.2023"},
        {id: 9, field: "Data Rozwiązania Umowy", content: "10.03.2023"},
        {id: 10, field: "Stanowisko", content: "IT Support Engineer"},
        {id: 11, field: "Wykształcenie", content: "Inżynier"},
    ]

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['employeeFileData__container']}>
                <div className={classes['employeeFileData__header']}>
                    <h1>Kartoteka Pracownika</h1>
                </div>
                <div className={classes['employeeFileData__data_container']}>
                { exampleData.map(data => (
                    <div key={data.id} className={classes['employeeFileData__element']}>
                        <span className={classes['employeeFileData__field']}>{data.field}: </span> 
                        <span className={classes['employeeFileData__content']}>{data.content}</span>
                    </div>))
                }
                </div>
            </section>
        </div>
    )
}

export default EmployeeFileData
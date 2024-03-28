import React from "react"
import Nav from "../Utils/Nav"
import Background from "../Utils/Background"
import classes from './EmployeeFile.module.scss'

const EmployeeFile: React.FC = () => {

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['employee-file__container']}>
                <div className={classes['employeeFile__header']}>
                    <h1>Kartoteka</h1>
                </div>
                <div className={classes['employeeFile__content-container']}>
                    <span>Sekcja kartoteki uzytkownika przeznaczona jest dla wyświetlenia informacji systemowych o uzytkowniku lub zmiany jego biezacego hasła.</span>
                </div>
            </section>
            <Background />
        </div>
    )
}

export default EmployeeFile
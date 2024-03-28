import React from "react"
import { useNavigate } from "react-router-dom"
import Nav from "../Utils/Nav"
import Button from "../Utils/Button"
import Background from "../Utils/Background"
import classes from './EmployeePersonalData.module.css'

const EmployeePersonalData: React.FC = () => {
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        navigate('/raportowanie/dane-pracownika/pracownik')
    }

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['employee-data__container']}>
                <form onSubmit={handleSubmit}>
                    <div className={classes['employee-data__header']}>
                        <h1>Pracownik - informacje</h1>
                    </div>
                    <div className={classes['employee-data__data_container']}>
                        <span>Wchodzisz w widok generowania informacji o pracowniku</span>
                    </div>
                    <div className={classes['employee-data__button_container']}>
                        <Button type="submit" text="Wykonaj" />
                    </div>
                </form>
            </section>
            <Background />
        </div>
    )
}

export default EmployeePersonalData
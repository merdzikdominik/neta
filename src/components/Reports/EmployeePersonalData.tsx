import React from "react"
import classes from './EmployeePersonalData.module.css'
import { useNavigate } from "react-router-dom"

const EmployeePersonalData: React.FC = () => {
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        navigate('/raportowanie/dane-pracownika/pracownik')
    }

    return (
        <>
            <section className={classes['employee-data-container']}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Pracownik - informacje</h1>
                    </div>
                    <div>
                        <div className={classes['employee-data-message']}>
                            <span>Wchodzisz w widok generowania informacji o pracowniku</span>
                        </div>
                        <div>
                            <button type="submit">Wykonaj</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EmployeePersonalData
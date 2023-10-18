import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import classes from './HolidaySchedule.module.css'


interface IDate {
    dateFrom: string,
    dateTo: string
}

const HolidaySchedule: React.FC = () => {
    const [date, setDate] = useState<IDate>({ dateFrom: '', dateTo: '' })
    const navigate = useNavigate()

    const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        setDate(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        
    } 

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        navigate('/raportowanie/data-urlopu/raport-urlopowy', { state: { prop: date } })
    }

    return (
    <div>
        <div>
            <h1>Planowanie urlopów</h1>
        </div>
        <form onSubmit={handleSubmitForm}>
            <div className={classes['scheduler-container']}>
                <span>Wybierz datę początkową i końcową na które ma zostać wygenerowany raport:</span>
                <div>
                    <div className={classes['scheduler-date-container']}>
                        <label>Data od:</label>
                        <input type="date" onChange={handleDate} name="dateFrom" required />
                    </div>
                    <div className={classes['scheduler-date-container']}>
                        <label>Data do:</label>
                        <input type="date" onChange={handleDate} name="dateTo" required />
                    </div>
                </div>
            </div>
            <div className={classes['scheduler-button-container']}>
                <button type="submit">Wykonaj</button>
            </div>
        </form>
    </div>
    )
}

export default HolidaySchedule
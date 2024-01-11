import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Nav from "../Utils/Nav"
import Button from "../Utils/Button"
import InteractiveBackground from "../Utils/InteractiveBackground"
import CalendarHolder from "../Utils/Calendar"
// import NewWindow from 'react-new-window'
import classes from "./HolidaySchedule.module.css"
import '../Utils/Calendar.module.scss'


interface IDate {
    dateFrom: string,
    dateTo: string
}

interface IState {
    showWindowPortal: boolean
}

const HolidaySchedule: React.FC = () => {
    const [date, setDate] = useState<IDate>({ dateFrom: '', dateTo: '' })
    const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false)
    // const [state, setState] = useState<IState>({ showWindowPortal: false })
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

    const handleOpenNewWindow = () => {
        window.open('/kalendarz', '_blank')
    }

    const handleOpenCalendar = () => {
        setIsCalendarOpened(prev => !prev)
    }

    return (
        <>
            <div className={classes['main']}>
                <Nav /> 
                <section className={classes['holiday-schedule__container']}>
                    <div className={classes['holiday-schedule__header']}>
                        <h1>Planowanie urlopów</h1>
                    </div>
                    <form onSubmit={handleSubmitForm}>
                        <div className={classes['holiday-schedule__data_container']}>
                            <span>Wybierz datę początkową i końcową na które ma zostać wygenerowany raport:</span>
                            <div>
                                <div className={classes['holiday-schedule__date-container']}>
                                    <label>Data od:</label>
                                    <input type="date" onChange={handleDate} name="dateFrom" required />
                                </div>
                                <div className={classes['holiday-schedule__date-container']}>
                                    <label>Data do:</label>
                                    <input type="date" onChange={handleDate} name="dateTo" required />
                                </div>
                            </div>
                        </div>
                        <div className={classes['holiday-schedule__button_container']}>
                            <Button type="submit" text="Pokaz kalendarz urlopowy" onClick={handleOpenCalendar}/>
                            <Button type="submit" text="Wykonaj" onClick={handleOpenNewWindow}/>
                        </div>
                    </form>
                    {isCalendarOpened && <CalendarHolder />}
                </section>
                <InteractiveBackground />
            </div>
        </>
    )
}

export default HolidaySchedule
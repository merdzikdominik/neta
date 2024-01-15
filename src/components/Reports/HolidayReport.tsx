import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/types"
import Nav from "../Utils/Nav"
import CalendarHolder from "../Utils/CalendarHolder"
import classes from './HolidayReport.module.scss'

const HolidayReport: React.FC = () => {
    const { dateFrom, dateTo } = useSelector((state: RootState) => state.dates)

    useEffect(() => {
        if (dateFrom && dateTo) {
            console.log(dateFrom, dateTo)
        }
        
    }, [dateFrom, dateTo])

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holiday-report__container']}>
                <CalendarHolder />
            </section>
        </div>
    )
}

export default HolidayReport
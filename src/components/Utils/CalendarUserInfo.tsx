import React from 'react'
import { IHoliday } from '../Holiday/HolidayApprovedRequests'
import classes from './CalendarUserInfo.module.scss'

interface ICalendarUserInfo {
    holidayDataProp: IHoliday[]
    calendarNavigationMonth: string
    position: {
        x: number
        y: number
    }
}

const CalendarUserInfo: React.FC<ICalendarUserInfo> = ({ holidayDataProp, calendarNavigationMonth, position }) => {
    const filtered = holidayDataProp.filter(holiday => !Array.isArray(holiday.color_hex) && (holiday.dateFrom.split('-')[1] === calendarNavigationMonth || holiday.dateTo.split('-')[1] === calendarNavigationMonth))

    const mapped = filtered.map((holiday, index) => {
        return (
            <div key={index} className={classes['calendarUserInfo__user']}>
                <div className={classes['calendarUserInfo__user-description-container']}>
                    <div style={{width: '40px', height: '40px', backgroundColor: (holiday.color_hex as string)}}></div>
                    <div className={classes['calendarUserInfo__user-description']}>
                        <div className={classes['calendarUserInfo__user-data']}>
                            <span>{holiday.user[0].first_name}</span>
                            <span>{holiday.user[0].last_name} •</span>
                            <span>{holiday.user[0].email}</span>
                        </div>
                        <div className={classes['calendarUserInfo__user-holiday']}>
                            <span>Urlop od <b>{holiday.dateFrom}</b> do <b>{holiday.dateTo}</b></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div style={{position: 'absolute', top: position.y, left: position.x}} className={classes['calendarUserInfo__main']}>
            {mapped}
        </div>
    )
}

export default CalendarUserInfo
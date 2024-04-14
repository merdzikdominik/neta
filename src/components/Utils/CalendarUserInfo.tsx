import React from 'react'
import classes from './CalendarUserInfo.module.scss'
import { IHoliday } from '../Holiday/HolidayApprovedRequests'

interface ICalendarUserInfo {
    holidayDataProp: IHoliday[]
    calendarNavigationMonth: string
    position: {
        x: number
        y: number
    }
}

const CalendarUserInfo: React.FC<ICalendarUserInfo> = ({ holidayDataProp, calendarNavigationMonth, position }) => {
    const filtered = holidayDataProp.filter(holiday => !Array.isArray(holiday.color_hex))
    const superFiltered = filtered.filter(holiday => {
        const dateSplit = holiday.dateFrom.split('-')

        if (dateSplit[1] === calendarNavigationMonth) {
            return holiday
        }
    })

    const mapped = superFiltered.map((holiday, index) => {
        return (
            <div key={index} className={classes['calendarUserInfo__user']}>
                <div className={classes['calendarUserInfo__user-description']}>
                    <div style={{width: '15px', height: '15px', backgroundColor: (holiday.color_hex as string)}}></div>
                    <span>{holiday.user[0].first_name}</span>
                    <span>{holiday.user[0].last_name}</span>
                    <span>{holiday.user[0].email}</span>
                </div>
                <div className={classes['calendarUserInfo__user-holiday']}>
                    <span>Urlop od {holiday.dateFrom} do {holiday.dateTo}</span>
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
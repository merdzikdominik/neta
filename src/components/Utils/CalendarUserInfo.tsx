import React from 'react'
import classes from './CalendarUserInfo.module.scss'

interface ICalendarUserInfo {
    firstName: string
    lastName: string
    email: string
    position: {
        x: number
        y: number
    }
}

const CalendarUserInfo: React.FC<ICalendarUserInfo> = ({ firstName, lastName, email, position }) => {
    return (
        <div style={{position: 'absolute', top: position.y, left: position.x}} className={classes['CalendarUserInfo__main']}>
            <span>{firstName} {lastName}</span>
            <span>{email}</span>
        </div>
    )
}

export default CalendarUserInfo
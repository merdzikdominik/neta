import React from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import HolidayApprovedRequests from './HolidayApprovedRequests'
import classes from './Holiday.module.scss'

const Holiday: React.FC = () => {
    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holiday__container']}>
                <div className={classes['holiday__header']}>
                    <h1>Urlopy</h1>
                </div>
                <div className={classes['holiday__content-container']}>
                    <span>Sekcja urlopów przeznaczona jest wykorzystywana w celu zaplanowania rocznego urlopu, zabookowania urlopu, wyświetlenia informacji o wolnych terminach urlopowych i wystawionych wnioskach.</span>
                    <HolidayApprovedRequests />
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default Holiday
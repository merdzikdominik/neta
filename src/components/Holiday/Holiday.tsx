import { motion } from 'framer-motion'
import React from 'react'
import Nav from '../Utils/Nav'
import Background from '../Utils/Background'
import HolidayApprovedRequests from './HolidayApprovedRequests'
import classes from './Holiday.module.scss'

const Holiday: React.FC = () => {
    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}>
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
                <Background />
            </div>
        </motion.div>
    )
}

export default Holiday
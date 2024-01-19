import React from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './Reports.module.scss'

const Reports: React.FC = () => {
    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['reports__container']}>

            </section>
            <InteractiveBackground />
        </div>
    )
}

export default Reports
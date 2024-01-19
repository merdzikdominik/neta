import React from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './Holiday.module.scss'

const Holiday: React.FC = () => {
    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holiday__container']}>

            </section>
            <InteractiveBackground />
        </div>
    )
}

export default Holiday
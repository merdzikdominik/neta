import { motion } from 'framer-motion'
import React from 'react'
import Nav from '../Utils/Nav'
import Background from '../Utils/Background'
import classes from './Reports.module.scss'

const Reports: React.FC = () => {
    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}>
            <div className={classes['main']}>
                <Nav />
                <section className={classes['reports__container']}>
                    <div className={classes['reports__header']}>
                        <h1>Raportowanie</h1>
                    </div>
                    <div className={classes['reports__content-container']}>
                        <span>Sekcja raportowania przeznaczona jest dla potrzeb wystawiania wniosków dotyczących zmiany informacji o uzytkowniku.</span>
                    </div>
                </section>
                <Background />
            </div>
        </motion.div>
    )
}

export default Reports
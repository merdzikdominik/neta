import React from "react"
import Nav from "../Utils/Nav"
import InteractiveBackground from "../Utils/InteractiveBackground"
import classes from './AdminModule.module.scss'


const AdminModule: React.FC = () => {


    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['adminModule__container']}>
                <div className={classes['adminModule__grid-container']}>
                    <div className={classes['adminModule__left-grid-column']}>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Lista wniosków urlopowych</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Zatwierdzanie wniosków</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Statystyki urlopów</span></div>
                    </div>
                    <div className={classes['adminModule__right-grid-column']}>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Zarządzanie rodzajami urlopów</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Powiadomienia</span></div>
                        <div className={classes['adminModule__exmaple-blocks']}><span>Eksport Danych</span></div>
                    </div>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default AdminModule
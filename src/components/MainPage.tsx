import React from 'react'
import { Link } from 'react-router-dom'
import InteractiveBackground from './Utils/InteractiveBackground'
import classes from './MainPage.module.css'

const MainPage: React.FC = () => {
    return (
        <main className={classes['main-page']}>
            <Link to='/modul-administracyjny'>
                Moduł administracyjny
            </Link>
            <Link to='/raportowanie'>
                Raportowanie
            </Link>
            <Link to='/kartoteka-pracownika'>
                Kartoteka Pracownika
            </Link>
            <Link to='/urlopy'>
                Urlopy
            </Link>
            <InteractiveBackground />
        </main>
    )
}

export default MainPage
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import InteractiveBackground from './Utils/InteractiveBackground'
import classes from './MainPage.module.css'

const MainPage: React.FC = () => {
    const fetchUserData = async () => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user_info', {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
    
                if (!response.ok) {
                    throw new Error(`Błąd pobierania danych użytkownika: ${response.statusText}`);
                }
        
                const userData = await response.json();
    
                console.log(userData)
    
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Błąd:', error.message);
                } else {
                    console.error('Nierozpoznany błąd:', error);
                }
            } 
        }

    };
      
    useEffect(() => {
        fetchUserData()
    }, [])

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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Background from './Utils/Background';
import classes from './MainPage.module.css';

const MainPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  const fetchIsAdmin = async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
          }
        })
  
        if (!response.ok) {
            throw new Error(`Błąd pobierania danych użytkownika: ${response.statusText}`)
        }
  
        const userData = await response.json()
        setIsAdmin(userData.is_superuser)
      
      } catch (error) {
        console.log(`Błąd pobierania danych o użytkowniku: ${error}`)
      }
    }
  }

  useEffect(() => {
    fetchIsAdmin();
    
  }, []);

  // initial={{ width: 0 }}
  // animate={{ width: '100%' }}
  // exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}

  return (
    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}>
      <main className={classes['main-page']}>
        <div className={classes['main-page__navigation-button']}>
          { isAdmin ? <Link to='/modul-administracyjny'>Moduł administracyjny</Link> : ''}
        </div>
        <div className={classes['main-page__navigation-button']}>
          <Link to='/raportowanie'>Raportowanie</Link>
        </div>
        <div className={classes['main-page__navigation-button']}>
          <Link to='/kartoteka-pracownika'>Kartoteka Pracownika</Link>
        </div>
        <div className={classes['main-page__navigation-button']}>
          <Link to='/urlopy'>Urlopy</Link>
        </div>
        <Background />
      </main>
    </motion.div>
  );
};

export default MainPage;

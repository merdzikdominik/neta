import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InteractiveBackground from './Utils/InteractiveBackground';
import classes from './MainPage.module.css';

const MainPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  const token = localStorage.getItem('authToken');

  const fetchIsAdmin = async () => {
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
    
  }, [token]);

  return (
    <main className={classes['main-page']}>
      { isAdmin ?? <Link to='/modul-administracyjny'>Moduł administracyjny</Link> }
      <Link to='/raportowanie'>Raportowanie</Link>
      <Link to='/kartoteka-pracownika'>Kartoteka Pracownika</Link>
      <Link to='/urlopy'>Urlopy</Link>
      <InteractiveBackground />
    </main>
  );
};

export default MainPage;

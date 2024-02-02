// MainPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InteractiveBackground from './Utils/InteractiveBackground';
import classes from './MainPage.module.css';

const hasToken = (): boolean => {
  const token = localStorage.getItem('authToken');
  return token !== null;
};

const MainPage: React.FC = () => {
  const [hasValidToken, setHasValidToken] = useState<boolean | null>(hasToken());

  useEffect(() => {
    const handleTokenChange = () => {
      setHasValidToken(hasToken());
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <main className={classes['main-page']}>
      <Link to='/modul-administracyjny'>Moduł administracyjny</Link>
      <Link to='/raportowanie'>Raportowanie</Link>
      <Link to='/kartoteka-pracownika'>Kartoteka Pracownika</Link>
      <Link to='/urlopy'>Urlopy</Link>
      <InteractiveBackground />
    </main>
  );
};

export default MainPage;

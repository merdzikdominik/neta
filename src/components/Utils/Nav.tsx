import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom'
import UserDataChange from "../Reports/UserDataChange"
import LogoutButton from "../Logout/LogoutButton"
import { Link } from 'react-router-dom'
import { Icon, listIcons  } from '@iconify/react'
import classes from './Nav.module.scss'

const Nav: React.FC = () => {
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

    const handleOpenNewWindow = (content: React.ComponentType) => {
        const newWindow = window.open('', '_blank', 'popup')

        if (newWindow) {
            newWindow.document.write('<html><body><div id="root"></div></body></html>')
            newWindow.document.close();

            const rootDiv = newWindow.document.getElementById('root')

            if (rootDiv) {
                const App = () => React.createElement(content)
                ReactDOM.render(<App />, rootDiv)
            }
        }
    }

    useEffect(() => {
        console.log(listIcons())
    }, [])

    return (
        <section className={classes['app']}>
            <aside className={classes['sidebar']}>
                <header>
                    Menu
                </header>
                <nav className={classes['sidebar-nav']}>
                    <ul>
                        { isAdmin ? <li><Link to='/modul-administracyjny'><i className="ion-ios-color-filter-outline"></i>Moduł administracyjny</Link></li> : '' }
                        <li>
                            <a href="#"><i className="ion-bag"></i> <span>Kartoteka</span></a>
                            <ul className={classes['nav-flyout']}>
                                <li>
                                    <Link to='/kartoteka-pracownika/dane-pracownika'><i className="ion-ios-color-filter-outline"></i>Twoje Dane</Link>
                                </li>
                                <li>
                                    <a href="#"><i className="ion-ios-clock-outline"></i>Konta</a>
                                    <ul className={classes['nav-sub-flyout']}>
                                        <li>
                                            <Link to='/kartoteka-pracownika/zarzadzanie-kontami'><i className="ion-ios-color-filter-outline"></i>Zarzadzanie kontami</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="ion-ios-settings"></i> <span className="">Raportowanie</span></a>
                            <ul className={classes['nav-flyout']}>
                                <Link to='#' onClick={handleOpenNewWindow.bind(null, UserDataChange)}>
                                    Nazwa Firmy - zmiana danych
                                </Link>
                                <li>
                                    <Link to='/raportowanie/data-urlopu'><i className="ion-ios-camera-outline"></i>Plany Urlopowe</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i className="ion-ios-briefcase-outline"></i> <span className="">Urlopy</span></a>
                            <ul className={classes['nav-flyout']}>
                                <li>
                                    <a href="#"><i className="ion-ios-chatboxes-outline"></i>Operacje</a>
                                    <ul className={classes['nav-sub-flyout']}>
                                        <li>
                                            <Link to='/urlopy/wnioski-urlopowe'><i className="ion-ios-color-filter-outline"></i>Dodaj wniosek urlopowy</Link>
                                        </li>
                                        <li>
                                            <Link to='/urlopy/lista-wnioskow'><i className="ion-ios-color-filter-outline"></i>Lista wniosków</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#"><i className="ion-ios-chatboxes-outline"></i>Plany Urlopowe</a>
                                    <ul className={classes['nav-sub-flyout']}>
                                        <li>
                                            <Link to='/urlopy/roczne-plany-urlopowe'><i className="ion-ios-color-filter-outline"></i>Roczne plany urlopowe</Link>
                                        </li>
                                        <li>
                                            <Link to='/urlopy/stan-rozplanowywania-urlopow'><i className="ion-ios-color-filter-outline"></i>Stan rozplanowania</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <LogoutButton />
                    </ul>
                </nav>
            </aside>
        </section>
    )
}

export default Nav
import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom'
import UserDataChange from "../Reports/UserDataChange"
import LogoutButton from "../Logout/LogoutButton"
import { Link } from 'react-router-dom'
import { InlineIcon  } from '@iconify/react'
import classes from './Nav.module.scss'

const Nav: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [selectedPane, setSelectedPane] = useState<string>('')

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

    const handleOnMouseOver = (paneName: string) => {
        setSelectedPane(paneName);
    }

    const handleOnMouseOut = () => {
        setSelectedPane('')
    }

    return (
        <section className={classes['app']}>
            <aside className={classes['sidebar']}>
                <header>
                    Menu <span>{ selectedPane !== '' ?  `⇒ ${selectedPane}` : '' }</span>
                </header>
                <nav className={classes['sidebar-nav']}>
                    <ul>
                        { isAdmin ? <li><Link to='/modul-administracyjny'><InlineIcon style={{ fontSize: '20px' }} icon="ic:baseline-admin-panel-settings" />Moduł administracyjny</Link></li> : '' }
                        <li>
                            <a href="#" onMouseOver={() => handleOnMouseOver('Kartoteka')} onMouseOut={handleOnMouseOut}>
                                <InlineIcon style={{ fontSize: '16px' }} icon="solar:folder-with-files-bold" /> <span>Kartoteka</span>
                            </a>
                            <ul className={classes['nav-flyout']} onMouseOver={() => handleOnMouseOver('Kartoteka')} onMouseOut={handleOnMouseOut}>
                                <li>
                                    <Link to='/kartoteka-pracownika/dane-pracownika'><i className="ion-ios-color-filter-outline"></i>Twoje Dane</Link>
                                </li>
                                <li>
                                    <Link to='/kartoteka-pracownika/zarzadzanie-kontami'><i className="ion-ios-color-filter-outline"></i>Zarzadzanie kontami</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onMouseOver={() => handleOnMouseOver('Raportowanie')}  onMouseOut={handleOnMouseOut}><InlineIcon style={{ fontSize: '18px' }} icon="ic:sharp-insert-drive-file"></InlineIcon> <span className="">Raportowanie</span></a>
                            <ul className={classes['nav-flyout']} onMouseOver={() => handleOnMouseOver('Raportowanie')}  onMouseOut={handleOnMouseOut}>
                                <Link to='#' onClick={handleOpenNewWindow.bind(null, UserDataChange)}>
                                    Nazwa Firmy - zmiana danych
                                </Link>
                                <li>
                                    <Link to='/raportowanie/data-urlopu'><i className="ion-ios-camera-outline"></i>Plany Urlopowe</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" onMouseOver={() => handleOnMouseOver('Urlopy')} onMouseOut={handleOnMouseOut}><InlineIcon style={{ fontSize: '18px' }} icon="ic:baseline-holiday-village"></InlineIcon> <span className="">Urlopy</span></a>
                            <ul className={classes['nav-flyout']} onMouseOver={() => handleOnMouseOver('Urlopy')} onMouseOut={handleOnMouseOut}>
                                <li>
                                    <Link to='/urlopy/wnioski-urlopowe'><i className="ion-ios-color-filter-outline"></i>Dodaj wniosek urlopowy</Link>
                                </li>
                                <li>
                                    <Link to='/urlopy/lista-wnioskow'><i className="ion-ios-color-filter-outline"></i>Lista wniosków</Link>
                                </li>
                                <li>
                                    <Link to='/urlopy/roczne-plany-urlopowe'><i className="ion-ios-color-filter-outline"></i>Roczne plany urlopowe</Link>
                                </li>
                                <li>
                                    <Link to='/urlopy/stan-rozplanowywania-urlopow'><i className="ion-ios-color-filter-outline"></i>Stan rozplanowania</Link>
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
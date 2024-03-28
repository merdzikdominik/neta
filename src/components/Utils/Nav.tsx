import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import LogoutButton from "../Logout/LogoutButton"
import { Link } from 'react-router-dom'
import { InlineIcon  } from '@iconify/react'
import classes from './Nav.module.scss'

interface IActive {
    isFileActive: boolean
    isReportsActive: boolean
    isHolidayActive: boolean
}

const Nav: React.FC = () => {
    const [isActive, setIsActive] = useState<IActive>({isFileActive: false, isReportsActive: false, isHolidayActive: false})
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [selectedPane, setSelectedPane] = useState<string>('')
    const [currentRoute, setCurrentRoute] = useState<string>('')

    const location = useLocation()

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
  
    
    // const handleOpenNewWindow = (content: React.ComponentType) => {
    //     const newWindow = window.open('', '_blank', 'popup')
        
    //     if (newWindow) {
    //         newWindow.document.write('<html><body><div id="root"></div></body></html>')
    //         newWindow.document.close();
            
    //         const rootDiv = newWindow.document.getElementById('root')
            
    //         if (rootDiv) {
    //             const App = () => React.createElement(content)
    //             ReactDOM.render(<App />, rootDiv)
    //         }
    //     }
    // }
    
    const handleIsActivePane = () => {
        const title = location.pathname.split('/')[1];
        setCurrentRoute(title);
        
        if (location.pathname.split('/').length > 2) {
            setIsActive(prev => ({
                ...prev,
                isFileActive: false,
                isReportsActive: false,
                isHolidayActive: false 
            }))    
            return 
        }
        setIsActive(prev => ({
            ...prev,
            isFileActive: title === 'kartoteka-pracownika',
            isReportsActive: title === 'raportowanie',
            isHolidayActive: title === 'urlopy'
        }));
    }
    
    const handleOnMouseOver = (paneName: string) => {
        setSelectedPane(paneName);
    }

    const handleOnMouseOut = () => {
        setSelectedPane('')

        if (isActive.isFileActive === false && isActive.isHolidayActive === false && isActive.isReportsActive === false) return

        setIsActive({
            isFileActive: false,
            isReportsActive: false,
            isHolidayActive: false
        })
    }

    useEffect(() => {
        fetchIsAdmin();
      
    }, []);
    
    useEffect(() => {
        handleIsActivePane()
    }, [])


    return (
        <section className={classes['app']}>
            <aside className={classes['sidebar']}>
                <header>
                    Menu <span>{ (selectedPane !== '') ?  `⇒ ${selectedPane}` : `⇒ ${(currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1)).split('-').join(' ')}` }</span>
                </header>
                <nav className={classes['sidebar-nav']}>
                    <ul>
                        { isAdmin 
                            ? (
                                <li>
                                    <Link className={classes['admin']} to='/modul-administracyjny'>
                                        <InlineIcon style={{ fontSize: '20px' }} icon="ic:baseline-admin-panel-settings"></InlineIcon> <span>Moduł administracyjny</span>
                                    </Link>
                                </li> 
                                )
                            : '' 
                        }
                        <li>
                            <Link to='/kartoteka-pracownika' onMouseOver={() => handleOnMouseOver('Kartoteka pracownika')} onMouseOut={handleOnMouseOut}>
                                <InlineIcon style={{ fontSize: '16px' }} icon="solar:folder-with-files-bold" /> <span>Kartoteka</span>
                            </Link>
                            <ul className={`${classes['nav-flyout']} ${isActive.isFileActive ? classes['active'] : ''}`} onMouseOver={() => handleOnMouseOver('Kartoteka pracownika')} onMouseOut={handleOnMouseOut}>
                                <li>
                                    <Link to='/kartoteka-pracownika/dane-pracownika'><i className="ion-ios-color-filter-outline"></i>Twoje Dane</Link>
                                </li>
                                <li>
                                    <Link to='/kartoteka-pracownika/zarzadzanie-kontami'><i className="ion-ios-color-filter-outline"></i>Zarzadzanie kontami</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/raportowanie' onMouseOver={() => handleOnMouseOver('Raportowanie')}  onMouseOut={handleOnMouseOut}><InlineIcon style={{ fontSize: '18px' }} icon="ic:sharp-insert-drive-file"></InlineIcon> <span className="">Raportowanie</span></Link>
                            <ul className={`${classes['nav-flyout']} ${isActive.isReportsActive ? classes['active'] : ''}`} onMouseOver={() => handleOnMouseOver('Raportowanie')}  onMouseOut={handleOnMouseOut}>
                                <Link to='/raportowanie/zmiana-danych'>
                                    Nazwa Firmy - zmiana danych
                                </Link>
                                <li>
                                    <Link to='/raportowanie/data-urlopu'><i className="ion-ios-camera-outline"></i>Plany Urlopowe</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/urlopy' onMouseOver={() => handleOnMouseOver('Urlopy')} onMouseOut={handleOnMouseOut}><InlineIcon style={{ fontSize: '18px' }} icon="ic:baseline-holiday-village"></InlineIcon> <span className="">Urlopy</span></Link>
                            <ul className={`${classes['nav-flyout']} ${isActive.isHolidayActive ? classes['active'] : ''}`} onMouseOver={() => handleOnMouseOver('Urlopy')} onMouseOut={handleOnMouseOut}>
                                <li>
                                    <Link to='/urlopy/wnioski-urlopowe'><i className="ion-ios-color-filter-outline"></i>Dodaj wniosek urlopowy</Link>
                                </li>
                                <li>
                                    <Link to='/urlopy/lista-wnioskow'><i className="ion-ios-color-filter-outline"></i>Lista wniosków</Link>
                                </li>
                                <li>
                                    <Link to='/urlopy/roczne-plany-urlopowe'><i className="ion-ios-color-filter-outline"></i>Roczne plany urlopowe</Link>
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
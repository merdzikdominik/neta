import React from "react"
import ReactDOM from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import classes from './Navigation.module.css'
import Test from "./Test"

interface Element {
    id: string,
    name: string,
    content: React.ComponentType | JSX.Element
}

const Navigation: React.FC = () => {
    const location = useLocation()
    const elements: Element[] = [{ id: '1', name: 'Element 1', content: <Test /> }]

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

    const employeeFileDropdown = (
        <ul>
            <li className={classes['dropdown']}>Kartoteka
                <ul className={classes['reports-dropdown']}>
                    <li>Twoje Dane</li>
                </ul>
            </li>
            <li className={classes['dropdown']}>Konta
                <ul className={classes['reports-dropdown']}>
                    <li>Zarządzanie użytkownikami</li>
                </ul>
            </li>
            <li className={classes['dropdown']}>Zastępca
                <ul className={classes['reports-dropdown']}>
                    <li>Pracownicy wyznaczający zastępców</li>
                </ul>
            </li>
            <li className={classes['dropdown']}>Rozliczenia pracownika
                <ul className={classes['reports-dropdown']}>
                    <li>PIT-11</li>
                    <li>PIT-40</li>
                </ul>
            </li>
        </ul>
    )

    const reportsDropdown = (
        <ul>
            <li className={classes['dropdown']}>Raporty
                <ul className={classes['reports-dropdown']}>
                    <li style={{cursor: 'pointer'}} onClick={handleOpenNewWindow.bind(null, Test)}>Nazwa Firmy - zmiana danych</li>
                    <li>Plany Urlopowe</li>
                    <li className={classes['dropdown__employee']}>Dane pracownika
                        <ul className={classes['reports-dropdown__employee']}>
                            <li>Pracownik - wyświetl informacje</li>
                            <li>Urlop macierzyński</li>
                            <li>Urlop ojcowski</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    )

    const holidayDropdown = (
        <ul>
            <li className={classes['dropdown']}>Operacje
                <ul className={classes['reports-dropdown']}>
                    <li>Dodaj wniosek urlopowy</li>
                    <li>Lista wniosków</li>
                    <li>Filtrowanie wniosków</li>
                    <li>Stany urlopów</li>
                </ul>
            </li>
            <li className={classes['dropdown']}>Plany Urlopowe
                <ul className={classes['reports-dropdown']}>
                    <li className={classes['dropdown__holiday-plans']}>Planowanie indywidualne
                        <ul className={classes['reports-dropdown__holiday']}>
                            <li>Urlopy wypoczynkowe</li>
                            <li>Urlopy dodatkowe</li>
                        </ul>
                    </li>
                    <li>Roczne plany urlopowe</li>
                    <li>Stan rozplanowania</li>
                    <li>Prezentacja - dni</li>
                    <li>Prezentacja - miesiące</li>
                </ul>
            </li>
        </ul>
    )

    return (
        <main className={classes['main']}>
            <nav>
                <ul className={classes['categories-dropdown']}>
                    <li>
                        <Link to='/kartoteka-pracownika'>Kartoteka</Link>
                        { location.pathname === '/kartoteka-pracownika' ? employeeFileDropdown : ''}
                    </li>
                    <li>
                        <Link to='/raportowanie'>Raportowanie</Link>
                        { location.pathname === '/raportowanie' ? reportsDropdown : ''}
                    </li>
                    <li>
                        <Link to='/urlopy'>Urlopy</Link>
                        { location.pathname === '/urlopy' ? holidayDropdown : ''}
                    </li>
                    <li>
                        <Link to='/wyloguj'>Wyloguj sie</Link>
                    </li>
                </ul>
            </nav>
        </main>
    )
}

export default Navigation
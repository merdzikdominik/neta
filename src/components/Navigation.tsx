import React, { useState } from "react"
import ReactDOM from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import classes from './Navigation.module.css'
import UserDataChange from "./Reports/UserDataChange"

interface Element {
    id: string,
    name: string,
    content: React.ComponentType | JSX.Element
}

const Navigation: React.FC = () => {
    const location = useLocation()

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
            <li>
                <Link to='/kartoteka-pracownika/dane-pracownika'>Twoje Dane</Link>
            </li>
            <li className={classes['dropdown']}>Konta
                <ul className={classes['reports-dropdown']}>
                    <li>
                        <Link to='/kartoteka-pracownika/zarzadzanie-kontami'>Zarządzanie użytkownikami</Link>
                    </li>
                </ul>
            </li>
        </ul>
    )

    const reportsDropdown = (
        <ul>
            <li className={classes['dropdown']}>Raporty
                <ul className={classes['reports-dropdown']}>
                    <li style={{cursor: 'pointer'}} onClick={handleOpenNewWindow.bind(null, UserDataChange)}>Nazwa Firmy - zmiana danych</li>
                    <li style={{cursor: 'pointer'}}>
                        <Link to='/raportowanie/data-urlopu'>Plany Urlopowe</Link>
                    </li>
                    <li className={classes['dropdown__employee']}>Dane pracownika
                        <ul className={classes['reports-dropdown__employee']}>
                            <li>
                                <Link to='/raportowanie/dane-pracownika'>Pracownik - wyświetl informacje</Link>
                            </li>
                            <li>
                                <Link to='/raportowanie/urlop-rodzicielski'>Urlop rodzicielski</Link>
                            </li>
                            <li>
                                <Link to='/raportowanie/stan-urlopowy'>Stan urlopowy</Link>
                            </li>
                            <li>
                                <Link to='/raportowanie/wykorzystane-urlopy'>Wykorzystane urlopy</Link>
                            </li>
                            <li>
                                <Link to='/raportowanie/nieobecnosci'>Nieobecności</Link>
                            </li>
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
                    <li>
                        <Link to='/urlopy/wnioski-urlopowe'>Dodaj wniosek urlopowy</Link>
                    </li>
                    <li>
                        <Link to='/urlopy/lista-wnioskow'>Lista wniosków</Link>
                    </li>
                </ul>
            </li>
            <li className={classes['dropdown']}>Plany Urlopowe
                <ul className={classes['reports-dropdown']}>
                    <li>
                        <Link to='/urlopy/roczne-plany-urlopowe'>Roczne plany urlopowe</Link>
                    </li>
                    <li>
                        <Link to='/urlopy/stan-rozplanowywania-urlopow'>Stan rozplanowania</Link>
                    </li>
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

// const ResponsiveNav: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const location = useLocation()

//     const handleOpenNewWindow = (content: React.ComponentType) => {
//         const newWindow = window.open('', '_blank', 'popup')

//         if (newWindow) {
//             newWindow.document.write('<html><body><div id="root"></div></body></html>')
//             newWindow.document.close();

//             const rootDiv = newWindow.document.getElementById('root')

//             if (rootDiv) {
//                 const App = () => React.createElement(content)
//                 ReactDOM.render(<App />, rootDiv)
//             }
//         }
//     }

//     const employeeFileDropdown = (
//         <ul>
//             <li>
//                 <Link to='/kartoteka-pracownika/dane-pracownika'>Twoje Dane</Link>
//             </li>
//             <li className={classes['dropdown']}>Konta
//                 <ul className={classes['reports-dropdown']}>
//                     <li>
//                         <Link to='/kartoteka-pracownika/zarzadzanie-kontami'>Zarządzanie użytkownikami</Link>
//                     </li>
//                 </ul>
//             </li>
//         </ul>
//     )

//     const reportsDropdown = (
//         <ul>
//             <li className={classes['dropdown']}>Raporty
//                 <ul className={classes['reports-dropdown']}>
//                     <li style={{cursor: 'pointer'}} onClick={handleOpenNewWindow.bind(null, Test)}>Nazwa Firmy - zmiana danych</li>
//                     <li style={{cursor: 'pointer'}}>
//                         <Link to='/raportowanie/data-urlopu'>Plany Urlopowe</Link>
//                     </li>
//                     <li className={classes['dropdown__employee']}>Dane pracownika
//                         <ul className={classes['reports-dropdown__employee']}>
//                             <li>
//                                 <Link to='/raportowanie/dane-pracownika'>Pracownik - wyświetl informacje</Link>
//                             </li>
//                             <li>
//                                 <Link to='/raportowanie/urlop-rodzicielski'>Urlop rodzicielski</Link>
//                             </li>
//                             <li>
//                                 <Link to='/raportowanie/stan-urlopowy'>Stan urlopowy</Link>
//                             </li>
//                             <li>
//                                 <Link to='/raportowanie/wykorzystane-urlopy'>Wykorzystane urlopy</Link>
//                             </li>
//                             <li>
//                                 <Link to='/raportowanie/nieobecnosci'>Nieobecności</Link>
//                             </li>
//                         </ul>
//                     </li>
//                 </ul>
//             </li>
//         </ul>
//     )

//     const holidayDropdown = (
//         <ul>
//             <li className={classes['dropdown']}>Operacje
//                 <ul className={classes['reports-dropdown']}>
//                     <li>
//                         <Link to='/urlopy/wnioski-urlopowe'>Dodaj wniosek urlopowy</Link>
//                     </li>
//                     <li>
//                         <Link to='/urlopy/lista-wnioskow'>Lista wniosków</Link>
//                     </li>
//                 </ul>
//             </li>
//             <li className={classes['dropdown']}>Plany Urlopowe
//                 <ul className={classes['reports-dropdown']}>
//                     <li>
//                         <Link to='/urlopy/roczne-plany-urlopowe'>Roczne plany urlopowe</Link>
//                     </li>
//                     <li>
//                         <Link to='/urlopy/stan-rozplanowywania-urlopow'>Stan rozplanowania</Link>
//                     </li>
//                 </ul>
//             </li>
//         </ul>
//     )
  
//     return (
//       <div className={classes["responsive-nav"]}>
//         <nav>
//             <ul className={classes['categories-dropdown']}>
//                 <li>
//                     <Link to='/kartoteka-pracownika'>Kartoteka</Link>
//                     { location.pathname === '/kartoteka-pracownika' ? employeeFileDropdown : ''}
//                 </li>
//                 <li>
//                     <Link to='/raportowanie'>Raportowanie</Link>
//                     { location.pathname === '/raportowanie' ? reportsDropdown : ''}
//                 </li>
//                 <li>
//                     <Link to='/urlopy'>Urlopy</Link>
//                     { location.pathname === '/urlopy' ? holidayDropdown : ''}
//                 </li>
//                 <li>
//                     <Link to='/wyloguj'>Wyloguj sie</Link>
//                 </li>
//             </ul>
//         </nav>
//       </div>
//     );
//   };
  
//   export default ResponsiveNav;
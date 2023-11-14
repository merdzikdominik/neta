import React from 'react'
import ReactDOM from 'react-dom'
import HolidayStatusReport from './HolidayStatusReport'
import classes from '../Reports/EmployeePersonalData.module.css'

const HolidayStatus: React.FC = () => {
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

    return (
        <section className={classes['employee-data-container']}>
            <div>
                <h1>Urlop rodzicielski</h1>
            </div>
            <div>
                <div className={classes['employee-data-message']}>
                    <span>Zaraz otworzysz raport zawierający request na urlop rodzicielski</span>
                </div>
                <div>
                    <button type="submit" onClick={handleOpenNewWindow.bind(null, HolidayStatusReport)}>Wykonaj</button>
                </div>
            </div>
        </section>
    )
}

export default HolidayStatus
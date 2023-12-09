import React from 'react'
import ReactDOM from 'react-dom'
import HolidayStatusReport from './HolidayStatusReport'
import Nav from '../Utils/Nav'
import Button from '../Utils/Button'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './HolidayStatus.module.scss'

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
// ogarnac stany urlopowe zeby nie byly urlopem rodzicielskim
    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holiday-status__container']}>
                <div className={classes['holiday-status__header']}>
                    <h1>Urlop rodzicielski</h1>
                </div>
                <div className={classes['holiday-status__data_container']}>
                    <span>Zaraz otworzysz raport zawierający request na urlop rodzicielski</span>
                </div>
                <div className={classes['holiday-status__button_container']}>
                    <Button type="button" text="Wykonaj" onClick={handleOpenNewWindow.bind(null, HolidayStatusReport)}/>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default HolidayStatus
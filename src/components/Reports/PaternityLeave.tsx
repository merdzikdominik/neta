import React from 'react'
import ReactDOM from 'react-dom'
import PaternityLeaveForm from './PaternityLeaveForm'
import Nav from '../Utils/Nav'
import Button from '../Utils/Button'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './PaternityLeave.module.scss'

const PaternityLeave: React.FC = () => {
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
        <div className={classes['main']}>
            <Nav />
            <section className={classes['paternity-leave__container']}>
                <div className={classes['paternity-leave__header']}>
                    <h1>Urlop rodzicielski</h1>
                </div>
                <div className={classes['paternity-leave__data-container']}>
                    <span>Zaraz otworzysz raport zawierający request na urlop rodzicielski</span>
                </div>
                <div className={classes['paternity-leave__button-container']}>
                    <Button type="button" text="Wykonaj" onClick={handleOpenNewWindow.bind(null, PaternityLeaveForm)}/>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default PaternityLeave
import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import HolidayUsedReport from './HolidayUsedReport'
import Nav from '../Utils/Nav'
import Button from '../Utils/Button'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './HolidayUsed.module.scss'

const HolidayUsed: React.FC = () => {
    const [isFirstCheckboxPressed, setIsFirstCheckboxPressed] = useState<boolean>(false)
    const chosenMonthRef = useRef<HTMLSelectElement | null>(null)
    const chosenYearRef = useRef<HTMLSelectElement | null>(null)

    const months = [
        { value: '01', label: 'Styczeń' },
        { value: '02', label: 'Luty' },
        { value: '03', label: 'Marzec' },
        { value: '04', label: 'Kwiecień' },
        { value: '05', label: 'Maj' },
        { value: '06', label: 'Czerwiec' },
        { value: '07', label: 'Lipiec' },
        { value: '08', label: 'Sierpień' },
        { value: '09', label: 'Wrzesień' },
        { value: '10', label: 'Październik' },
        { value: '11', label: 'Listopad' },
        { value: '12', label: 'Grudzień' },
    ]

    const years = [
        { value: '01', label: '2023' },
        { value: '02', label: '2022' },
        { value: '03', label: '2021' },
        { value: '04', label: '2020' },
        { value: '05', label: '2019' },
        { value: '06', label: '2018' }
    ]

    const handleMonthChange = () => {
        if (chosenMonthRef.current) {
            console.log(chosenMonthRef.current.value)
        }
    }

    const handleYearChange = () => {
        if (chosenYearRef.current) {
            console.log(chosenYearRef.current.value)
        }
    }

    const handleFirstCheckboxPress = () => {
        setIsFirstCheckboxPressed(true)
    }

    const handleSecondCheckboxPress = () => {
        setIsFirstCheckboxPressed(false)
    }

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

    // zrobic komponent z tego
    const monthsYearsDropdown = (
        <>
            <div>
                <label htmlFor="months">Wybierz miesiąc:</label>
                <select id="months" name="months" onChange={handleMonthChange} ref={chosenMonthRef}>
                    <option value="">Wybierz miesiąc</option>
                    {months.map((month) => (
                        <option key={month.value} value={month.label}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="months">Wybierz rok:</label>
                <select id="months" name="months" onChange={handleYearChange} ref={chosenYearRef}>
                    <option value="">Wybierz rok</option>
                    {years.map((year) => (
                        <option key={year.value} value={year.label}>
                            {year.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holiday-used__container']}>
                <div className={classes['holiday-used__header']}>
                    <h1>Wykorzystane urlopy</h1>
                </div>
                <div>
                    <div className={classes['holiday-used__data-container']}>
                        <div>
                            <input 
                                type="radio" 
                                name="radio1"
                                onChange={handleFirstCheckboxPress}
                            />
                            Miesiąc i Rok dla wygenerowania raportu: 

                            { isFirstCheckboxPressed ? monthsYearsDropdown : ''}

                        </div>

                        <div>
                            <input 
                                type="radio" 
                                name="radio1"
                                onChange={handleSecondCheckboxPress}
                            /> Inny okres: 
                            <label>Data od: </label>
                            <input type="date" />
                            <label>Data do: </label>
                            <input type="date" />
                        </div>
                    </div>

                    <div className={classes['holiday-used__button-container']}>
                        <Button type="button" text="Wykonaj" onClick={handleOpenNewWindow.bind(null, HolidayUsedReport)}/>
                    </div>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default HolidayUsed
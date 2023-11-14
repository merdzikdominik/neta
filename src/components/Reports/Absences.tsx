import React, { useRef } from "react"
import ReactDOM from 'react-dom'
import AbsencesReport from "./AbsencesReport"

const Absences: React.FC = () => {
    const chosenMonth = useRef<HTMLSelectElement | null>(null)
    const chosenYear = useRef<HTMLSelectElement | null>(null)

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
        if (chosenMonth.current) {
            console.log(chosenMonth.current.value)
        }
    }

    const handleYearChange = () => {
        if (chosenYear.current) {
            console.log(chosenYear.current.value)
        }
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

    const monthsYearsDropdown = (
        <>
            <div>
                <label htmlFor="months">Wybierz miesiąc:</label>
                <select id="months" name="months" onChange={handleMonthChange} ref={chosenMonth}>
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
                <select id="months" name="months" onChange={handleYearChange} ref={chosenYear}>
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
        <div>
            <div>
                <h1>Nieobecności</h1>
            </div>
            <div>
                <div>
                    <input type="radio" name="input" /> Wybierz miesiąc i rok do generowania raportu
                    { monthsYearsDropdown }
                </div>
                <div>
                    <input type="radio" name="input" /> Inny okres:
                    <label>Data od</label>
                    <input type="date" />
                    <label>Data do</label>
                    <input type="date" />
                </div>
            </div>
            <button type="submit" onClick={handleOpenNewWindow.bind(null, AbsencesReport)}>Wykonaj</button>
        </div>
    )
}

export default Absences
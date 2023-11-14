import React from "react"
import classes from '../Reports/EmployeePersonalData.module.css'

const HolidayRequestList: React.FC = () => {
    const data: string[][] = [
        ['1', 'A1', 'B1', 'C1', 'D1', 'E1'],
        ['2', 'A2', 'B2', 'C2', 'D2', 'E2'],
    ]

    const headers: string[] = [
        'Nr', 
        'Data od', 
        'Data do', 
        'Typ urlopu', 
        'Status wniosku',
        'Pracownik'
    ]

    return (
        <section className={classes['employee-data-container']}>
            <div>
                <h1>Wnioski Urlopowe</h1>
            </div>
            <div>
            <table>
            <thead>
            <tr>
                {headers.map((header, index) => (
                <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
            </div>
        </section>
    )
}

export default HolidayRequestList
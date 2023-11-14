import React from 'react'

const HolidayStatusReport: React.FC = () => {

    const data: string[][] = [
        ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'],
        ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2'],
    ]

    const headers: string[] = [
        'Obliczony obecny okres', 
        'Obliczony pozostały okres na początku roku', 
        'Obecny urlop zużyty w roku', 
        'Pozostały okres wykorzystany w roku', 
        'Obecny urlop do wykorzystania', 
        'Pozostały urlop do wykorzystania', 
        'Całkowity urlop do wykorzystania'
    ]

    return (
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
    )
}

export default HolidayStatusReport

// Calculated current period (Obliczony obecny okres): Ta kolumna może zawierać informacje o obecnym okresie, w którym pracownik ubiega się o urlop rodzicielski. To może być okres w dniach, tygodniach lub miesiącach.

// Calculated outstanding period at the beginning of the year (Obliczony pozostały okres na początku roku): Ta kolumna zawiera informacje o pozostałym czasie urlopu rodzicielskiego na początek roku kalendarzowego. Może to być pozostały urlop z ubiegłego roku lub planowany urlop na przyszłość.

// Current leave used in a year (Obecny urlop zużyty w roku): To jest liczba dni lub okresów, które pracownik już wykorzystał w bieżącym roku kalendarzowym na urlop rodzicielski.

// Outstanding period used in a year (Pozostały okres wykorzystany w roku): To jest liczba dni lub okresów, które pracownik wykorzystał z pozostałego urlopu na początku roku.

// Current leave to be used (Obecny urlop do wykorzystania): To jest liczba dni urlopu rodzicielskiego, którym pracownik nadal ma prawo w bieżącym roku kalendarzowym. Możesz obliczyć to, odejmując "Current leave used in a year" od "Calculated current period".

// Outstanding leave to be used (Pozostały urlop do wykorzystania): To jest liczba dni urlopu rodzicielskiego, które pozostają do wykorzystania z "Calculated outstanding period at the beginning of the year" w bieżącym roku.

// Total leave to be used (Całkowity urlop do wykorzystania): Suma "Current leave to be used" i "Outstanding leave to be used" - to jest łączna liczba dni urlopu rodzicielskiego, które pracownik ma do wykorzystania w danym roku.
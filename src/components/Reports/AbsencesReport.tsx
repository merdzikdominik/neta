import React from 'react'

const AbsencesReport: React.FC = () => {
    const data: string[][] = [
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
    ]

    const headers: string[] = [
        'N', 
        'Data od', 
        'Data do', 
        'Tytuł', 
        'Liczba dni'
    ]
    return (
        <div>
            <h1>Nieobecności uzytkownika</h1>
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
    )
}

export default AbsencesReport
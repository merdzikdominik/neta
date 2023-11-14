import React from 'react'

const HolidayPlanningStatus: React.FC = () => {
    const data: string[][] = [
        ['A1', 'B1', 'C1', 'D1', 'E1'],
        ['A2', 'B2', 'C2', 'D2', 'E2'],
    ]

    const userHeaders: string[] = [
        'ID Uzytkownika', 
        'Nazwisko', 
        'Imię', 
        'Stanowisko', 
        'Liczba dni'
    ]

    const holidayTypeCategories: string[] = [
        'Zaplanowane',
        'Wykorzystane',
        'Do wykorzystania'
    ]

    return <>Holiday Planning Status</>
}

export default HolidayPlanningStatus
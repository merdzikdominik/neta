import React, { useRef } from "react"

const HolidayRequest: React.FC = () => {
    const selectedHolidayTypesRef = useRef<HTMLSelectElement | null>(null)
    const holidayTypes = [
        {id: '01', label: 'Urlop wypoczynkowy (w tym urlop na żądanie, urlop zaległy z poprzedniego roku czy wczasy pod gruszą)'},
        {id: '02', label: 'Urlop macierzyński'},
        {id: '03', label: 'Urlop ojcowski'},
        {id: '04', label: 'Urlop rodzicielski'},
        {id: '05', label: 'Opieka nad dzieckiem'},
        {id: '06', label: 'Urlop okolicznościowy'},
        {id: '07', label: 'Urlop szkoleniowy'}
    ]

    const handleHolidayTypes = () => {
        if (selectedHolidayTypesRef.current) {
            console.log(selectedHolidayTypesRef.current.value)
        }
    }

    return (
        <div>
            <div>
                <h1>Wniosek urlopowy - dodawanie rekordu</h1>
            </div>
            <div>
                <div>
                    <h2>Stan na ostatni dzień roku</h2>
                </div>
                <div>
                    <div>
                        <label>Data od: </label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>Data do: </label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>Ilość dni urlopu</label>
                        <input type="text" disabled />
                    </div>
                </div>
                <span>Typ urlopu:</span>
                <div>
                    <label htmlFor="months">Wybierz miesiąc:</label>
                    <select id="months" name="months" onChange={handleHolidayTypes} ref={selectedHolidayTypesRef}>
                        <option value="">Wybierz miesiąc</option>
                        {holidayTypes.map((holidayType) => (
                            <option key={holidayType.id} value={holidayType.label}>
                                {holidayType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <button type="submit">Wykonaj</button>
            </div>
        </div>
    )
}

export default HolidayRequest
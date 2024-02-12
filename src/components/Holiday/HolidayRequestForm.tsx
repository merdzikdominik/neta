import React, { useState, useRef, ChangeEvent } from "react";
import Nav from "../Utils/Nav";
import InteractiveBackground from "../Utils/InteractiveBackground";
import Button from "../Utils/Button";
import classes from './HolidayRequestForm.module.scss';

const HolidayRequestForm: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);
    const [selectedHolidayType, setSelectedHolidayType] = useState<string>('');
    const selectedHolidayTypesRef = useRef<HTMLSelectElement | null>(null);
    const token = localStorage.getItem('authToken')

    const holidayTypes = [
        { id: '01', label: 'Urlop wypoczynkowy (w tym urlop na żądanie, urlop zaległy z poprzedniego roku czy wczasy pod gruszą)' },
        { id: '02', label: 'Urlop macierzyński' },
        { id: '03', label: 'Urlop ojcowski' },
        { id: '04', label: 'Urlop rodzicielski' },
        { id: '05', label: 'Opieka nad dzieckiem' },
        { id: '06', label: 'Urlop okolicznościowy' },
        { id: '07', label: 'Urlop szkoleniowy' }
    ];

    const handleHolidayTypes = () => {
        if (selectedHolidayTypesRef.current) {
            const selectedType = selectedHolidayTypesRef.current.value;
            setSelectedHolidayType(selectedType);
        }
    }

    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        calculateDateDifference(e.target.value, endDate);
    }

    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        calculateDateDifference(startDate, e.target.value);
    }

    const calculateDateDifference = (start: string, end: string) => {
        const startDateObject = new Date(start);
        const endDateObject = new Date(end);

        if (!isNaN(startDateObject.getTime()) && !isNaN(endDateObject.getTime())) {
            const differenceInMilliseconds = endDateObject.getTime() - startDateObject.getTime();
            const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

            if (differenceInDays >= 0) {
                setDifferenceInDays(differenceInDays);
            } else {
                setDifferenceInDays(null);
            }
        } else {
            setDifferenceInDays(null);
        }
    }

    const clearInputs = () => {
        setStartDate('')
        setEndDate('')
        setDifferenceInDays(0)

        if (selectedHolidayTypesRef.current) {
            selectedHolidayTypesRef.current.value = '';
        }
    }

    const handleSubmit = async () => {
        if (token) {
            try {
                const responseUserData = await fetch('http://127.0.0.1:8000/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                });
    
                if (!responseUserData.ok) {
                    throw new Error(`Błąd pobierania danych użytkownika: ${responseUserData.statusText}`);
                }
    
                const userData = await responseUserData.json();
                const { first_name, last_name, email } = userData;
    
                const response = await fetch("http://127.0.0.1:8000/api/create_holiday_request", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    body: JSON.stringify({
                        user: {
                            first_name,
                            last_name,
                            email
                        },
                        start_date: startDate,
                        end_date: endDate,
                        difference_in_days: differenceInDays,
                        selected_holiday_type: selectedHolidayType,
                    }),
                });

                if (!response.ok) {
                    const errorMessage = await response.text()
                    throw new Error(`HTTP error! Status: ${response.status}, Error: ${errorMessage}`);
                }

                const data = await response.json();
                console.log("Successfully created holiday request:", data);

                clearInputs();

            } catch (error) {
                console.error("Error creating holiday request:", error);
            }
        }
    };
    

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['holidayRequest__container']}>
                <div className={classes['holidayRequest__header']}>
                    <h1>Wniosek urlopowy - dodawanie rekordu</h1>
                </div>
                <div className={classes['holidayRequest__data_container']}>
                    <div className={classes['holidayRequest__field_container']}>
                        <label>Data od: </label>
                        <input
                            type="date"
                            className={classes['holidayRequest__input']}
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </div>
                    <div className={classes['holidayRequest__field_container']}>
                        <label>Data do: </label>
                        <input
                            type="date"
                            className={classes['holidayRequest__input']}
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div>
                    <div className={classes['holidayRequest__field_container']}>
                        <label>Ilość dni: </label>
                        <input
                            type="text"
                            disabled
                            className={classes['holidayRequest__input']}
                            value={differenceInDays !== null ? differenceInDays : ''}
                        />
                    </div>
                    <div className={classes['holidayRequest__months-dropdown']}>
                        <label htmlFor="months">Typ urlopu:</label>
                        <select id="months" name="months" onChange={handleHolidayTypes} ref={selectedHolidayTypesRef}>
                            <option value="">Wybierz miesiąc</option>
                            {holidayTypes.map((holidayType) => (
                                <option key={holidayType.id} value={holidayType.label}>
                                    {holidayType.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={classes['holidayRequest__button_container']}>
                        <Button type="submit" onClick={handleSubmit} text="Wykonaj" />
                    </div>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default HolidayRequestForm;

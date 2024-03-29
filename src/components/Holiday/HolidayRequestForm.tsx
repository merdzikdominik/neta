import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { sendNotifications } from "../../store/actions/action-creators";
import { toast } from "react-toastify";
import { IHolidayType } from "../Admin/AdminModule";
import uuid from "react-uuid";
import Nav from "../Utils/Nav";
import Background from "../Utils/Background";
import Button from "../Utils/Button";
import classes from './HolidayRequestForm.module.scss';

const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const HolidayRequestForm: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);
    const [selectedHolidayType, setSelectedHolidayType] = useState<string>('');
    const [holidayTypes, setHolidayTypes] = useState<IHolidayType[]>([])
    const selectedHolidayTypesRef = useRef<HTMLSelectElement | null>(null);
    const token = localStorage.getItem('authToken')

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

    useEffect(() => {
        const fetchHolidayTypes = async () => {
            const token = localStorage.getItem('authToken')

            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/all_holiday_types', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`,
                        },
                    })

                    if (response.ok) {
                        const data = await response.json();
        
                        setHolidayTypes(data);
                    } else {
                        console.error('Błąd podczas pobierania typów urlopowych');
                        toast.error('Wystąpił bład podczas pobierania typów urlopowych.')
                    }
                } catch (error) {
                    console.error('Błąd podczas pobierania typów urlopowych', error);
                }
            }
        }
        fetchHolidayTypes()
    }, [])

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
                    toast.error('Wystąpił bład podczas pobierania Twoich danych.')
                    throw new Error(`Błąd pobierania danych użytkownika: ${responseUserData.statusText}`);
                }

                const [ startYear, startMonth, startDay ] = startDate.split('-')
                const [ endYear, endMonth, endDay ] = endDate.split('-')

                const handleCheckDates = () => {
                    if (
                        (Number(startDay) > Number(endDay) && Number(startMonth) > Number(endMonth) && Number(startYear) > Number(endYear)) ||
                        (Number(startDay) > Number(endDay) && Number(startMonth) > Number(endMonth) && Number(startYear) === Number(endYear)) || 
                        (Number(startDay) > Number(endDay) && Number(startMonth) === Number(endMonth) && Number(startYear) > Number(endYear)) || 
                        (Number(startDay) > Number(endDay) && Number(startMonth) === Number(endMonth) && Number(startYear) === Number(endYear))
                    ) { return true }
                    
                    return false
                }
        
                if (handleCheckDates()) { 
                    toast.info('Błędnie wprowadzone daty.') 
                    return
                }
        
                if (selectedHolidayType === '') {
                    toast.info('Wybierz typ urlopowy.')
                    return
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
                        color_hex: generateRandomColor()
                    }),
                });

                if (!response.ok) {
                    const errorMessage = await response.text()

                    toast.error('Wystąpił błąd podczas przetwarzania Twojego wniosku.')
                    throw new Error(`HTTP error! Status: ${response.status}, Error: ${errorMessage}`);
                }

                const data = await response.json()
                console.log("Successfully created holiday request:", data)

                const currentDate = new Date();
                const currentHour = currentDate.getHours();
                const currentMinute = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes()
                const currentTime = `${currentHour}:${currentMinute}`;

                sendNotifications({ id: uuid(), label: `Nowy wniosek urlopowy dla ${first_name} ${last_name} | (${currentTime})` }, token)

                toast.success('Pomyślnie dodano wniosek urlopowy.')

                clearInputs();

            } catch (error) {
                console.error("Error creating holiday request:", error);
                toast.error('Wystąpił błąd podczas wysyłania wniosku urlopowego.')
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
                        <select id="months" name="holiday_types" onChange={handleHolidayTypes} ref={selectedHolidayTypesRef}>
                            <option value="">Wybierz typ urlopu</option>
                            {holidayTypes.map((holidayType) => (
                                <option key={holidayType.id} value={holidayType.label}>
                                    {holidayType.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={classes['holidayRequest__button_container']}>
                    <Button type="submit" background="white" onClick={handleSubmit} text="Wykonaj" />
                </div>
            </section>
            <Background />
        </div>
    )
}

export default HolidayRequestForm;

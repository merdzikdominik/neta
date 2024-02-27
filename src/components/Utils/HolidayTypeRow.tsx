import React from "react"
import { IHolidayType } from "../Admin/AdminModule"
import classes from './HolidayTypeRow.module.scss'


const HolidayTypeRow: React.FC<IHolidayType> = ({ id, label }) => {
    const handleDeleteHolidayType = async () => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/all_holiday_types`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    body: JSON.stringify({ id: id }),
                });

                if (response.ok) {
                    console.log(`Usunięto typ urlopu ${id}`);
                    document.location.reload()
                } else {
                    const data = await response.json();
                    console.error(data);
                    console.error(`Błąd podczas usuwania typu urlopu ${data}`);
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania typu urlopu:', error);
            }
        }
    };

    return (
        <article className={classes['listRow__main']}>
            <div className={classes['listRow__content-container']}>
                <span key={id}>{ label }</span>
                <button type="button" onClick={handleDeleteHolidayType} className={classes['listRow__btn-close']}>
                    <span className={classes['listRow__icon-cross']}></span>
                    <span className={classes['listRow__visually-hidden']}>Close</span>
                </button>
            </div>
        </article>
    )
}

export default HolidayTypeRow
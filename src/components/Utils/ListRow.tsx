import React, { useState } from "react"
import classes from './ListRow.module.scss'
import { IHolidayRequest, IUser } from "../Admin/AdminModule"

interface IListRow {
    userInfo: IUser;
    requestInfo: IHolidayRequest;
}

const ListRow: React.FC<IListRow> = ({ userInfo, requestInfo }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const {
        approved,
        created_at,
        difference_in_days,
        start_date,
        end_date,
        message,
        selected_holiday_type
    } = requestInfo;

    const { first_name, last_name, email } = userInfo;

    const handleExpandToggle = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <article className={`${classes['listRow__main']} ${isExpanded ? classes['expanded'] : ''}`}>
            <div className={classes['listRow__header-container']} onClick={handleExpandToggle}>
                <h1 className={classes['listRow__user-data-header']}>{first_name} {last_name} | Wniosek o {selected_holiday_type}</h1>
                <span className={classes['listRow__user-data-subheader']}>Utworzony w dniu {created_at}</span>
            </div>
            {isExpanded && (
                <div className={classes['listRow__container']}>
                    <span className={classes['listRow__request-title']}>Uzytkownik {first_name} {last_name} wnioskuje o zatwierdzenie urlopu typu: <b><i>{selected_holiday_type}</i></b></span>
                    <h2>Dane wniosku</h2>
                    <div className={classes['listRow__request-content-container']}>
                        <span><i></i>Imię uzytkonika: <i>{first_name}</i></span>
                        <span>Nazwisko uzytkonika: <i>{last_name}</i></span>
                        <span>Email uzytkownika: <i>{email}</i></span>
                        <span><i>{message}</i></span>
                        <span>Długość urlopu: <i>{difference_in_days === 1 ? `${difference_in_days} dzień` : `${difference_in_days} dni`}</i></span>
                        <span>Status wniosku: <b><i>{approved ? 'Zatwierdzony' : 'Niezatwierdzony'}</i></b> </span>
                    </div>
                    <div className={classes['listRow__button-container']}>
                        <button>Zatwierdz</button>
                        <button>Odrzuć</button>
                    </div>
                </div>
            )}
        </article>
    );
}

export default ListRow
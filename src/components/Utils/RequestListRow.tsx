import React, { useState, useEffect } from "react"
import { IHolidayRequest, IRequestUser } from "../Admin/AdminModule"
import { toast } from "react-toastify"
import Button from "./Button"
import 'react-toastify/dist/ReactToastify.css'
import classes from './RequestListRow.module.scss'

interface IListRow {
    userInfo: IRequestUser,
    requestInfo: IHolidayRequest
}

export const notify = (status: string, message: string) => {
    switch(status) {
        case 'accept':
            toast.success(message)
            break
        
        case 'reject':
            toast.info(message)
            break
        
        default:
            return
    }
}

const ListRow: React.FC<IListRow> = ({ userInfo, requestInfo }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isApproved, setIsApproved] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

    const {
        id,
        approved,
        created_at,
        difference_in_days,
        message,
        selected_holiday_type
    } = requestInfo;
    
    const { first_name, last_name, email } = userInfo;

    useEffect(() => {
        setIsApproved(approved)
    }, [approved])

    const fetchIsAdmin = async () => {
        const token = localStorage.getItem('authToken');
    
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user', {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                })
        
                if (!response.ok) {
                    throw new Error(`Błąd pobierania danych użytkownika: ${response.statusText}`)
                }
        
                const userData = await response.json()
                setIsAdmin(userData.is_superuser)
            
            } catch (error) {
                console.log(`Błąd pobierania danych o użytkowniku: ${error}`)
            }
        }
    }
    
    useEffect(() => {
        fetchIsAdmin();
    
    }, []);

    const handleApprove = async (id: string) => {
        const token = localStorage.getItem('authToken')

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/approve_holiday_request/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                setIsApproved(true)
                console.log('Pomyslnie zatwierdzono wniosek')

                notify('accept', 'Pomyslnie zatwierdzono wniosek')

            } else {
                console.error('Failed to approve holiday request');
            }
        } catch (error) {
            console.error('Error while processing the request', error);
        }
    };

    const handleReject = async (id: string) => {
        const token = localStorage.getItem('authToken')

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/reject_holiday_request/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                setIsApproved(false)
                console.log('Pomyslnie odrzucono wniosek')

                notify('reject', 'Pomyslnie odrzucono wniosek')

            } else {
                console.error('Failed to reject holiday request');
            }
        } catch (error) {
            console.error('Error while processing the request', error);
        }
    };

    const handleExpandToggle = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <article className={`${classes['listRow__main']} ${isExpanded ? classes['expanded'] : ''}`}>
            <div className={`${classes['listRow__header-container']} ${isApproved ? classes['approved'] : classes['denied']} ${isExpanded ? classes['highlight'] : ''}`} onClick={handleExpandToggle}>
                <h1 className={classes['listRow__user-data-header']}>{first_name} {last_name} | {selected_holiday_type}</h1>
                <span className={classes['listRow__user-data-subheader']}>Utworzony w dniu {created_at}</span>
            </div>
            {isExpanded && (
                <div className={classes['listRow__container']}>
                    <span className={classes['listRow__request-title']}>Uzytkownik {first_name} {last_name} wnioskuje o zatwierdzenie urlopu typu: <b><i>{selected_holiday_type}</i></b></span>
                    <h2>Dane wniosku</h2>
                    <div className={classes['listRow__request-content-container']}>
                        <span><i></i>Imię uzytkownika: <i>{first_name}</i></span>
                        <span>Nazwisko uzytkownika: <i>{last_name}</i></span>
                        <span>Email uzytkownika: <i>{email}</i></span>
                        <span><i>{message}</i></span>
                        <span>Długość urlopu: <i>{difference_in_days === 1 ? `${difference_in_days} dzień` : `${difference_in_days} dni`}</i></span>
                        <span>Status wniosku: <b><i>{isApproved ? 'Zatwierdzony' : 'Niezatwierdzony'}</i></b> </span>
                    </div>
                    {isAdmin 
                    ?
                    (<div className={classes['listRow__button-container']}>
                        <Button type='button' text='Zatwierdzony' onClick={() => handleApprove(id)} disabled={isApproved ? true : false} background='white' />
                        <Button type='button' text='Odrzuć' onClick={() => handleReject(id)} disabled={isApproved ? false : true} background='white' />
                    </div>)
                    : ''
                    }
                </div>
            )}
        </article>
    );
}

export default ListRow
import React, { useState, useEffect} from "react"
import { IUserDataChangeNotification } from "./Modal"
import { notify } from "./HolidayRequestListRow"
import Button from "./Button"
import classes from './UserDataChangeRequestRow.module.scss'


interface IUserDataChangeRequestRow {
    notification: IUserDataChangeNotification
}

const UserDataChangeRequestRow: React.FC<IUserDataChangeRequestRow> = ({ notification }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isApproved, setIsApproved] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

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
                //TODO: apply function which adds holiday to db here
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
        <article className={`${classes['main']} ${isExpanded ? classes['expanded'] : ''}`}>
            <div className={`${classes['userDataChangeRequest__header-container']} ${isExpanded ? classes['highlight'] : ''}`} onClick={handleExpandToggle}>
                <h1 className={classes['userDataChangeRequest__user-data-header']}>Uzytkownik: {notification.user.first_name} {notification.user.last_name} wnioskuje o zmianę następujących danych (rozwiń)</h1>
            </div>
            { isExpanded ? (
                <div className={classes['userDataChangeRequest__container']}>
                    { notification.surname && <span>Nazwisko: { notification.surname }</span> }
                    { notification.city_permanent_residence && <span>Miasto (adres stałego zameldowania): <i><b>{ notification.city_permanent_residence }</b></i></span> }
                    { notification.postal_code_permanent_residence && <span>Kod pocztowy (adres stałego zameldowania): <i><b>{ notification.postal_code_permanent_residence }</b></i></span> }
                    { notification.post_permanent_residence && <span>Poczta (adres stałego zameldowania): <i><b>{ notification.post_permanent_residence }</b></i></span> }
                    { notification.municipal_commune_permanent_residence && <span>Gmina miejska (adres stałego zameldowania): <i><b>{ notification.municipal_commune_permanent_residence }</b></i></span> }
                    { notification.voivodeship_permanent_residence && <span>Województwo (adres stałego zameldowania): <i><b>{ notification.voivodeship_permanent_residence }</b></i></span> }
                    { notification.country_permanent_residence && <span>Państwo (adres stałego zameldowania): <i><b>{ notification.country_permanent_residence }</b></i></span> }
                    { notification.street_permanent_residence && <span>Ulica (adres stałego zameldowania): <i><b>{ notification.street_permanent_residence }</b></i></span> }
                    { notification.house_number_permanent_residence && <span>Numer domu (adres stałego zameldowania): <i><b>{ notification.house_number_permanent_residence }</b></i></span> }
                    { notification.flat_number_permanent_residence && <span>Numer mieszkania (adres stałego zameldowania): <i><b>{ notification.flat_number_permanent_residence }</b></i></span> }
                    { notification.mobile_number_permanent_residence && <span>Nr telefonu (adres stałego zameldowania): <i><b>{ notification.mobile_number_permanent_residence }</b></i></span> }

                    { notification.city_second_residence && <span>Miasto (adres zamieszkania): <i><b>{ notification.city_second_residence }</b></i></span> }
                    { notification.postal_code_second_residence && <span>Kod pocztowy (adres zamieszkania): <i><b>{ notification.postal_code_second_residence }</b></i></span> }
                    { notification.post_second_residence && <span>Poczta (adres zameldowania): <i><b>{ notification.post_second_residence }</b></i></span> }
                    { notification.municipal_commune_second_residence && <span>Gmina miejska (adres zamieszkania): <i><b>{ notification.municipal_commune_second_residence }</b></i></span> }
                    { notification.voivodeship_second_residence && <span>Województwo (adres zamieszkania): <i><b>{ notification.voivodeship_second_residence }</b></i></span> }
                    { notification.country_second_residence && <span>Państwo (adres zamieszkania): <i><b>{ notification.country_second_residence }</b></i></span> }
                    { notification.street_second_residence && <span>Ulica (adres zamieszkania): <i><b>{ notification.street_second_residence }</b></i></span> }
                    { notification.house_number_second_residence && <span>Numer domu (adres zamieszkania): <i><b>{ notification.house_number_second_residence }</b></i></span> }
                    { notification.flat_number_second_residence && <span>Numer mieszkania (adres zamieszkania): <i><b>{ notification.flat_number_second_residence }</b></i></span> }
                    { notification.mobile_number_second_residence && <span>Nr telefonu (adres zamieszkania): <i><b>{ notification.mobile_number_second_residence }</b></i></span> }

                    { notification.city_correspondence_residence && <span>Miasto (adres do korespondencji): <i><b>{ notification.city_correspondence_residence }</b></i></span> }
                    { notification.postal_code_correspondence_residence && <span>Kod pocztowy (adres do korespondencji): <i><b>{ notification.postal_code_correspondence_residence }</b></i></span> }
                    { notification.post_correspondence_residence && <span> Poczta (adres do korespondencji): <i><b>{ notification.post_correspondence_residence }</b></i></span> }
                    { notification.municipal_commune_correspondence_residence && <span> Gmina miejska (adres do korespondencji): <i><b>{ notification.municipal_commune_correspondence_residence }</b></i></span> }
                    { notification.voivodeship_correspondence_residence && <span> Województwo (adres do korespondencji): <i><b>{ notification.voivodeship_correspondence_residence }</b></i></span> }
                    { notification.country_correspondence_residence && <span>Państwo (adres do korespondencji): <i><b>{ notification.country_correspondence_residence }</b></i></span> }
                    { notification.street_correspondence_residence && <span>Ulica (adres do korespondencji): <i><b>{ notification.street_correspondence_residence }</b></i></span> }
                    { notification.house_number_correspondence_residence && <span>Numer domu (adres do korespondencji): <i><b>{ notification.house_number_correspondence_residence }</b></i></span> }
                    { notification.flat_number_correspondence_residence && <span>Numer mieszkania (adres do korespondencji): <i><b>{ notification.flat_number_correspondence_residence }</b></i></span> }
                    { notification.mobile_number_correspondence_residence && <span>Nr telefonu (adres do korespondencji): <i><b>{ notification.mobile_number_correspondence_residence }</b></i></span> }
                    { notification.tax_office && <span>Urząd skarbowy: <i><b>{ notification.tax_office }</b></i></span> }
                    { notification.correspondence_address && <span>Adres do korespondencji: <i><b>{ notification.correspondence_address }</b></i></span> }
                    { notification.annual_settlement_address && <span>Adres rozliczenia rocznego: <i><b>{ notification.annual_settlement_address }</b></i></span> }
                    { notification.nfz_branch && <span>Oddział NFZ: <i><b>{ notification.nfz_branch }</b></i></span> }
                    { notification.id_data && <span>Seria dowodu osobistego: <i><b>{ notification.id_data }</b></i></span> }
                    { notification.id_given_by && <span>Dowód wydany przez: <i><b>{ notification.id_given_by }</b></i></span> }
                    { notification.id_date && <span>Data wydania dowodu: <i><b>{ notification.id_date }</b></i></span> }
                </div>
            ) : '' }
            
            {isAdmin 
            ?
            (<div className={classes['listRow__button-container']}>
                <Button type='button' text='Zatwierdzony' onClick={() => handleApprove(notification.id!)} disabled={isApproved ? true : false} background='white' />
                <Button type='button' text='Odrzuć' onClick={() => handleReject(notification.id!)} disabled={isApproved ? false : true} background='white' />
            </div>)
            : ''
            }
        </article>
    )
}

export default UserDataChangeRequestRow

// tax_office: string,
// correspondence_address: null | string | undefined
// annual_settlement_address: null | string | undefined,
// nfz_branch: string,
// id_data: string,
// id_given_by: string,
// id_date: string
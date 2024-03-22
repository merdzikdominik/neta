import React, { useState, useEffect} from "react"
import { IUserDataChangeNotification } from "./Modal"
import { notify } from "./HolidayRequestListRow"
import { toast } from "react-toastify"
import Button from "./Button"
import classes from './UserDataChangeRequestRow.module.scss'


interface IUserDataChangeRequestRow {
    notification: IUserDataChangeNotification
}

const UserDataChangeRequestRow: React.FC<IUserDataChangeRequestRow> = ({ notification }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [isApproved, setIsApproved] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const {
        surname,
        id,
        approved,
        city_permanent_residence,
        postal_code_permanent_residence,
        post_permanent_residence,
        municipal_commune_permanent_residence,
        voivodeship_permanent_residence,
        country_permanent_residence,
        street_permanent_residence,
        house_number_permanent_residence,
        flat_number_permanent_residence,
        mobile_number_permanent_residence,
        city_second_residence,
        postal_code_second_residence,
        post_second_residence,
        municipal_commune_second_residence,
        voivodeship_second_residence,
        country_second_residence,
        street_second_residence,
        house_number_second_residence,
        flat_number_second_residence,
        mobile_number_second_residence,
        city_correspondence_residence,
        postal_code_correspondence_residence,
        post_correspondence_residence,
        municipal_commune_correspondence_residence,
        voivodeship_correspondence_residence,
        country_correspondence_residence,
        street_correspondence_residence,
        house_number_correspondence_residence,
        flat_number_correspondence_residence,
        mobile_number_correspondence_residence,
        tax_office,
        correspondence_address,
        annual_settlement_address,
        nfz_branch,
        id_data,
        id_given_by,
        id_date
      } = notification;
      

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

    useEffect(() => {
        setIsApproved(approved)
    }, [approved])

    const handleUpdateUserData = async () => {
        const token = localStorage.getItem('authToken')

        try {
            const response = await fetch('http://127.0.0.1:8000/api/update_user_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            })

            if (!response.ok) {
                toast.error('Nie udało się zaktualizować danych uzytkownika.')
            }

            toast.success('Pomyślnie zaktualizowano dane uzytkownika.')
        } catch (e) {
            console.error(`Wystapil blad podczas aktualizacji danych uzytkownika ${e}`)
        }

    }

    const handleApprove = async (id: string) => {
        const token = localStorage.getItem('authToken')

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/approve_data_change_request/${id}`, {
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
                handleUpdateUserData()

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
            const response = await fetch(`http://127.0.0.1:8000/api/reject_data_change_request/${id}`, {
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
                    {surname && <span>Nazwisko: <b>{surname}</b></span>}
                    {city_permanent_residence && <span>Miasto (adres stałego zameldowania): <i><b>{city_permanent_residence}</b></i></span>}
                    {postal_code_permanent_residence && <span>Kod pocztowy (adres stałego zameldowania): <i><b>{postal_code_permanent_residence}</b></i></span>}
                    {post_permanent_residence && <span>Poczta (adres stałego zameldowania): <i><b>{post_permanent_residence}</b></i></span>}
                    {municipal_commune_permanent_residence && <span>Gmina miejska (adres stałego zameldowania): <i><b>{municipal_commune_permanent_residence}</b></i></span>}
                    {voivodeship_permanent_residence && <span>Województwo (adres stałego zameldowania): <i><b>{voivodeship_permanent_residence}</b></i></span>}
                    {country_permanent_residence && <span>Państwo (adres stałego zameldowania): <i><b>{country_permanent_residence}</b></i></span>}
                    {street_permanent_residence && <span>Ulica (adres stałego zameldowania): <i><b>{street_permanent_residence}</b></i></span>}
                    {house_number_permanent_residence && <span>Numer domu (adres stałego zameldowania): <i><b>{house_number_permanent_residence}</b></i></span>}
                    {flat_number_permanent_residence && <span>Numer mieszkania (adres stałego zameldowania): <i><b>{flat_number_permanent_residence}</b></i></span>}
                    {mobile_number_permanent_residence && <span>Nr telefonu (adres stałego zameldowania): <i><b>{mobile_number_permanent_residence}</b></i></span>}

                    {city_second_residence && <span>Miasto (adres zamieszkania): <i><b>{city_second_residence}</b></i></span>}
                    {postal_code_second_residence && <span>Kod pocztowy (adres zamieszkania): <i><b>{postal_code_second_residence}</b></i></span>}
                    {post_second_residence && <span>Poczta (adres zameldowania): <i><b>{post_second_residence}</b></i></span>}
                    {municipal_commune_second_residence && <span>Gmina miejska (adres zamieszkania): <i><b>{municipal_commune_second_residence}</b></i></span>}
                    {voivodeship_second_residence && <span>Województwo (adres zamieszkania): <i><b>{voivodeship_second_residence}</b></i></span>}
                    {country_second_residence && <span>Państwo (adres zamieszkania): <i><b>{country_second_residence}</b></i></span>}
                    {street_second_residence && <span>Ulica (adres zamieszkania): <i><b>{street_second_residence}</b></i></span>}
                    {house_number_second_residence && <span>Numer domu (adres zamieszkania): <i><b>{house_number_second_residence}</b></i></span>}
                    {flat_number_second_residence && <span>Numer mieszkania (adres zamieszkania): <i><b>{flat_number_second_residence}</b></i></span>}
                    {mobile_number_second_residence && <span>Nr telefonu (adres zamieszkania): <i><b>{mobile_number_second_residence}</b></i></span>}

                    {city_correspondence_residence && <span>Miasto (adres do korespondencji): <i><b>{city_correspondence_residence}</b></i></span>}
                    {postal_code_correspondence_residence && <span>Kod pocztowy (adres do korespondencji): <i><b>{postal_code_correspondence_residence}</b></i></span>}
                    {post_correspondence_residence && <span>Poczta (adres do korespondencji): <i><b>{post_correspondence_residence}</b></i></span>}
                    {municipal_commune_correspondence_residence && <span>Gmina miejska (adres do korespondencji): <i><b>{municipal_commune_correspondence_residence}</b></i></span>}
                    {voivodeship_correspondence_residence && <span>Województwo (adres do korespondencji): <i><b>{voivodeship_correspondence_residence}</b></i></span>}
                    {country_correspondence_residence && <span>Państwo (adres do korespondencji): <i><b>{country_correspondence_residence}</b></i></span>}
                    {street_correspondence_residence && <span>Ulica (adres do korespondencji): <i><b>{street_correspondence_residence}</b></i></span>}
                    {house_number_correspondence_residence && <span>Numer domu (adres do korespondencji): <i><b>{house_number_correspondence_residence}</b></i></span>}
                    {flat_number_correspondence_residence && <span>Numer mieszkania (adres do korespondencji): <i><b>{flat_number_correspondence_residence}</b></i></span>}
                    {mobile_number_correspondence_residence && <span>Nr telefonu (adres do korespondencji): <i><b>{mobile_number_correspondence_residence}</b></i></span>}
                    {tax_office && <span>Urząd skarbowy: <i><b>{tax_office}</b></i></span>}
                    {correspondence_address && <span>Adres do korespondencji: <i><b>{correspondence_address}</b></i></span>}
                    {annual_settlement_address && <span>Adres rozliczenia rocznego: <i><b>{annual_settlement_address}</b></i></span>}
                    {nfz_branch && <span>Oddział NFZ: <i><b>{nfz_branch}</b></i></span>}
                    {id_data && <span>Seria dowodu osobistego: <i><b>{id_data}</b></i></span>}
                    { id_given_by && <span>Dowód wydany przez: <i><b>{ id_given_by }</b></i></span> }
                    { id_date && <span>Data wydania dowodu: <i><b>{ id_date }</b></i></span> }
                </div>
            ) : '' }
            
            {isAdmin 
            ?
            (<div className={classes['listRow__button-container']}>
                <Button type='button' text='Zatwierdzony' onClick={() => handleApprove(id)} disabled={isApproved ? true : false} background='white' />
                <Button type='button' text='Odrzuć' onClick={() => handleReject(id)} disabled={isApproved ? false : true} background='white' />
            </div>)
            : ''
            }
        </article>
    )
}

export default UserDataChangeRequestRow
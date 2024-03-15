import React, { useState } from "react"
// import { IUser } from "../Admin/AdminModule"
import { IUserInfo } from "../EmployeeFile/EmployeeFileData"
import classes from './UserRequestRow.module.scss'

interface IUserProps {
    user: IUserInfo
}


const UserRequestRow: React.FC<IUserProps> = ({ user }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const handleExpandToggle = () => {
        setIsExpanded(prev => !prev);
    };

    
    return (
    <article className={`${classes['userRow__main']} ${isExpanded ? classes['expanded'] : ''}`}>
        <div className={`${classes['userRow__header-container']} ${isExpanded ? classes['highlight'] : ''}`} onClick={handleExpandToggle}>
            <h1 className={classes['userRow__user-data-header']}>Uzytkownik: {user.first_name} {user.last_name}</h1>
        </div>
        {isExpanded 
        ? (
            <div className={classes['userRow__container']}>
                <div className={classes['userRow__data-content-container']}>
                    <span>Imię uzytkownika: <i>{ user.first_name }</i></span>
                    <span>Drugie imię uzytkownika: <i>{ user.second_name }</i></span>
                    <span>Nazwisko uzytkownika: <i>{ user.last_name }</i></span>
                    <span>Email uzytkownika: <i>{ user.email }</i></span>
                    <span>Stanowisko: <i>{ user.role }</i></span>
                    <span>Wiek uzytkownika: <i>{ user.age }</i></span>
                    <span>Nr telefonu: <i>{ user.mobile_number }</i></span>
                    <span>Wykształcenie: <i>{ user.education }</i></span>
                    <span>Data urodzenia: <i>{ user.birth_date }</i></span>
                    <span>Data rozpoczęcia pracy: <i>{ user.employment_start_date }</i></span>
                    <span>Data zakończenia pracy: <i>{ user.employment_end_date }</i></span>
                    <span>Ostatnio zalogowany: <i>{ user.last_login }</i></span>
                    <span>Adres do korespondencji: <i>{ user.correspondence_address }</i> </span>
                    <span>Urząd skarbowy: <i>{ user.tax_office }</i> </span>
                    <span>Adres rozliczenia rocznego: <i>{ user.annual_settlement_address }</i> </span>
                    <span>Oddział NFZ: <i>{ user.nfz_branch }</i> </span>
                    <span>Seria i numer dowodu osobistego: <i>{ user.id_data }</i> </span>
                    <span>Wydany przez: <i>{ user.id_given_by }</i> </span>
                    <span>Data wydania dokumentu: <i>{ user.date }</i> </span>
                    <span>Administrator: <i>{ user.is_superuser ? 'Tak' : 'Nie' }</i> </span>
                    <span>Ostatnie logowanie: <i>{ user.last_login }</i> </span>
                </div>
            </div>
        )
        : ''}
    </article>)
}

export default UserRequestRow
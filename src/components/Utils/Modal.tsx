import React, { useState } from "react";
import { IHolidayRequest, IUser, IHolidayType } from "../Admin/AdminModule";
import { IUserInfo } from "../EmployeeFile/EmployeeFileData";
import { INotification } from "../../store/types";
import { toast } from "react-toastify";
import UserDataChangeRequestRow from "./UserDataChangeRequestRow";
import UserRequestRow from "./UserRequestRow";
import RequestListRow from "./HolidayRequestListRow";
import HolidayTypeRow from "./HolidayTypeRow";
import Button from "./Button";
import classes from './Modal.module.scss';

export interface IUserDataChangeNotification {
    user: {
        first_name: string,
        last_name: string,
        email: string
    }
    id: string,
    approved: boolean,
    surname: string,
    city_permanent_residence: string,
    postal_code_permanent_residence: string,
    post_permanent_residence: string,
    municipal_commune_permanent_residence: string,
    voivodeship_permanent_residence: string,
    country_permanent_residence: string,
    street_permanent_residence: string,
    house_number_permanent_residence: string,
    flat_number_permanent_residence: string,
    mobile_number_permanent_residence: string
    city_second_residence: string,
    postal_code_second_residence: string,
    post_second_residence: string,
    municipal_commune_second_residence: string,
    voivodeship_second_residence: string,
    country_second_residence: string,
    street_second_residence: string,
    house_number_second_residence: string,
    flat_number_second_residence: string,
    mobile_number_second_residence: string
    city_correspondence_residence: string,
    postal_code_correspondence_residence: string,
    post_correspondence_residence: string,
    municipal_commune_correspondence_residence: string,
    voivodeship_correspondence_residence: string,
    country_correspondence_residence: string,
    street_correspondence_residence: string,
    house_number_correspondence_residence: string,
    flat_number_correspondence_residence: string,
    mobile_number_correspondence_residence: string
    tax_office: string,
    correspondence_address: null | string | undefined
    annual_settlement_address: null | string | undefined,
    nfz_branch: string,
    id_data: string,
    id_given_by: string,
    id_date: string
}

interface IModal {
    toggleModal: () => void;
    modalTitle: string;
    modalContent: IHolidayRequest[] | IUserInfo[] | IHolidayType[] | INotification[] | IUserDataChangeNotification[]
    handleExcel?: (data: IHolidayRequest[]) => void;
}

const modalMode = (
    value: string,
    modalContent: IModal["modalContent"],
    handleExcel?: IModal["handleExcel"],
    handleAddHolidayType?: () => Promise<void>,
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
): React.ReactNode => {
    switch (value) {
        case 'Lista wniosków urlopowych':
            if (Array.isArray(modalContent) && modalContent.length > 0 && "user" in modalContent[0]) {
                return (
                    <>
                        {modalContent.length > 0 
                            ?
                                (modalContent as IHolidayRequest[]).map((request: IHolidayRequest) => (
                                    <RequestListRow
                                        key={request.id}
                                        userInfo={request.user}
                                        requestInfo={request}
                                    />
                                ))
                            : 'Brak wniosków'}
                    </>
                );
            } else {
                return null;
            }

        case 'Tryb eksportu wniosków urlopowych dla HR':
            if (Array.isArray(modalContent)) {
                return (
                    <Button type="button" style={{ width: '100%' }} text="Generuj wnioski w arkuszu Excel" background="white" onClick={() => handleExcel?.(modalContent as IHolidayRequest[])} />
                );
            }

            return null;

        case 'Lista uzytkowników w systemie':
            if (Array.isArray(modalContent)) {
                return (
                    <>
                        {(modalContent as IUserInfo[]).map((user: IUserInfo, index: number) => (
                            <UserRequestRow
                                key={index}
                                user={user}
                            />
                        ))}
                    </>
                );
            } else {
                return null;
            }

        case 'Rodzaje urlopów':
            if (Array.isArray(modalContent)) {
                return (
                    <div className={classes['modal__content-container']}>
                        {(modalContent as IHolidayType[]).map((holidayType: IHolidayType) => (
                            <HolidayTypeRow key={holidayType.id} id={holidayType.id} label={holidayType.label} />
                        ))}
                        <div className={classes['modal__input-container']}>
                            <input
                                type="text"
                                className={classes['modal__input']}
                                placeholder="Wprowadź nowy typ urlopu"
                                onChange={handleInputChange}
                            />
                            <Button type="button" text="Dodaj" background="white" onClick={handleAddHolidayType} />
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        
        case 'Powiadomienia':
            if (Array.isArray(modalContent)) {
                return (
                    <>
                        {modalContent.length > 0
                            ? 
                                (modalContent as INotification[]).map((notification: INotification) => (
                                <div key={ notification.id }>
                                    <span>{ notification.label }</span>
                                </div>
                                ))
                            : 'Nie ma zadnych powiadomień.'
                        }
                    </>
                )
            } else {
                return null
            }

        case 'Wnioski uzytkowników o zmianę danych ewidencyjnych':
            if (Array.isArray(modalContent)) {
                return (
                    <div>
                        {modalContent.length > 0
                            ?
                                (modalContent as IUserDataChangeNotification[]).map((notification: IUserDataChangeNotification) => (
                                    <div key={notification.id}>
                                        <UserDataChangeRequestRow notification={notification} />
                                    </div>
                                ))
                            : 'Brak wniosków'
                        }
                    </div>
                )
            } else {
                return null
            }

        default:
            return null;
    }
};

const Modal: React.FC<IModal> = ({ toggleModal, modalTitle, modalContent, handleExcel }) => {
    const [newHolidayType, setNewHolidayType] = useState({ id: '', label: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const newId = modalContent.length + 1
        
        setNewHolidayType((prevData) => ({
            ...prevData,
            id: newId.toString(),
            label: value
        }));
    };

    const handleAddHolidayType = async () => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/all_holiday_types', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    body: JSON.stringify(newHolidayType),
                });
                if (response.ok) {
                    console.log(`Zaktualizowano typ urlopu ${response}`);

                    toast.success('Pomyślnie dodano typ urlopowy.')

                    setTimeout(() => {
                        document.location.reload()
                    }, 2000)

                } else {
                    const data = await response.json();

                    toast.error('Błąd podczas dodawania nowego typu urlopu. Spróbuj ponownie później.')
                    console.error(`Błąd podczas dodawania nowego typu urlopu ${data}`);
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas dodawania nowego typu urlopu:', error);
            }
        }
    };

    return (
        <div className={classes['modal']}>
            <div className={classes['modal__container']}>
                <header>
                    <div className={classes['modal__close']}>
                        <button className={classes['modal__close-btn']} onClick={() => toggleModal()}>
                            &times;
                        </button>
                    </div>
                    <h1 className={classes['modal__header']}>{modalTitle}</h1>
                </header>
                <div className={classes['modal__content']}>
                    {modalMode(modalTitle, modalContent, handleExcel, handleAddHolidayType, handleInputChange)}
                </div>
                <footer className={classes['modal__footer-button-container']}>
                    <Button type='button' text='Zamknij' background='white' onClick={() => toggleModal()} />
                </footer>
            </div>
        </div>
    );
};

export default Modal;
import React, { useState, useEffect } from "react";
import { IHolidayRequest, IUser, IHolidayType } from "../Admin/AdminModule";
import UserRequestRow from "./UserRequestRow";
import RequestListRow from "./RequestListRow";
import HolidayTypeRow from "./HolidayTypeRow";
import Button from "./Button";
import classes from './Modal.module.scss';

interface IModal {
    toggleModal: () => void;
    modalTitle: string;
    modalContent: IHolidayRequest[] | IUser[] | IHolidayType[];
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
                        {(modalContent as IHolidayRequest[]).map((request: IHolidayRequest) => (
                            <RequestListRow
                                key={request.id}
                                userInfo={request.user}
                                requestInfo={request}
                            />
                        ))}
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
                        {(modalContent as IUser[]).map((user: IUser) => (
                            <UserRequestRow
                                key={user.id}
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
                } else {
                    const data = await response.json();
                    console.error(data);
                    console.error(`Błąd podczas dodawania nowego typu urlopu ${data}`);
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas dodawania nowego typu urlopu:', error);
            }
        }
    };

    useEffect(() => {
        console.log(modalContent);
    }, [modalContent]);

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

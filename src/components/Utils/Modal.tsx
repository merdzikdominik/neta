import React from "react"
import { IHolidayRequest, IUser } from "../Admin/AdminModule"
import UserRequestRow from "./UserRequestRow"
import RequestListRow from "./RequestListRow"
import Button from "./Button"
import classes from './Modal.module.scss'

interface IModal {
    toggleModal: () => void,
    modalTitle: string,
    modalContent: IHolidayRequest[] | IUser[],
    handleExcel?: (data: IHolidayRequest[]) => void
}

const modalMode = (value: string, modalContent: IModal["modalContent"], handleExcel?: IModal["handleExcel"]): React.ReactNode => {
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
                )
            } else {
                return null;
            }

        default: return null;
    }
}

const Modal: React.FC<IModal> = ({ toggleModal, modalTitle, modalContent, handleExcel }) => {
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
                    {modalMode(modalTitle, modalContent, handleExcel)}
                </div>
                <footer className={classes['modal__footer-button-container']}>
                    <Button type='button' text='Zamknij' background='white' onClick={() => toggleModal()} />
                </footer>
            </div>
        </div>
    );
}

export default Modal;
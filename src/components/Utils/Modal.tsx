import React from "react"
import { IHolidayRequest } from "../Admin/AdminModule"
import ListRow from "./ListRow"
import Button from "./Button"
import classes from './Modal.module.scss'

interface IModal {
    toggleModal: () => void,
    modalTitle: string,
    modalContent: IHolidayRequest[],
    handleExcel?: (data: IHolidayRequest[]) => void
}

const Modal: React.FC<IModal> = ({ toggleModal, modalTitle, modalContent, handleExcel }) => {
    const modalMode = (value: string) => {
        switch(value) {
            case 'Lista wniosków urlopowych':
                return (
                    modalContent.map(request => (
                        <ListRow
                            key={request.id}
                            userInfo={request.user}
                            requestInfo={request}
                        />
                    ))
                )
            
            case 'Tryb eksportu wniosków urlopowych dla HR':
                return (
                    <Button type="button" style={{ width: '100%' }} text="Generuj wnioski w arkuszu Excel" background="white" onClick={() => handleExcel?.(modalContent)} />
                )
            
            default: return
        }
    }

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
                    {modalMode(modalTitle)}
                </div>
                <footer className={classes['modal__footer-button-container']}>
                    <Button type='button' text='Zamknij' background='white' onClick={() => toggleModal()} />
                </footer>
            </div>
        </div>
    );
}


export default Modal
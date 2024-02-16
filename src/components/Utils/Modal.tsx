import React, { useState, useEffect } from "react"
import { IHolidayRequest } from "../Admin/AdminModule"
import ListRow from "./ListRow"
import classes from './Modal.module.scss'

interface IModal {
    toggleModal: () => boolean,
    modalTitle: string,
    modalContent: IHolidayRequest[]
}

const Modal: React.FC<IModal> = ({ toggleModal, modalTitle, modalContent }) => {
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
                    {modalContent.map(request => (
                        <ListRow
                            key={request.id}
                            userInfo={request.user}
                            requestInfo={request}
                        />
                    ))}
                </div>
                <footer>
                    <button onClick={() => toggleModal()}>Close</button>
                </footer>
            </div>
        </div>
    );
}


export default Modal
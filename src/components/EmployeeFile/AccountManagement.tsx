import React, { useState, useEffect } from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import Button from '../Utils/Button'
import classes from './AccountManagement.module.scss'

const AccountManagement: React.FC = () => {
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const token = localStorage.getItem('authToken') || '';

    const handlePasswordChange = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/password_change', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword
                }),
            });

            if (response.ok) {
                console.log('Hasło zostało pomyślnie zmienione.');
            } else {
                console.error('Błąd podczas zmiany hasła.');
            }
        } catch (error) {
            console.error(`Wystąpił błąd: ${error}`);
        }
    };

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['accountManagement__container']}>
                <div className={classes['accountManagement__header']}>
                    <h1>Uzytkownicy w aplikacji - MODYFIKACJA</h1>
                </div>
                <div className={classes['accountManagement__data_container']}>
                    <div className={classes['accountManagement__field_container']}>
                        <label>Login </label>
                        <input type="text" className={classes['accountManagement__input']} placeholder="Wprowadź adres email"></input>
                    </div>
                    <div className={classes['accountManagement__field_container']}>
                        <label>Stare hasło </label>
                        <input
                            type="password" 
                            className={classes['accountManagement__input']} 
                            placeholder="Wprowadź stare hasło"
                            value={oldPassword}
                            onChange={(event) => setOldPassword(event.target.value)}
                        />
                    </div>
                    <div className={classes['accountManagement__field_container']}>
                        <label>Nowe hasło </label>
                        <input 
                            type="password" 
                            className={classes['accountManagement__input']} 
                            placeholder="Wprowadź nowe hasło"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                    </div>
                    <div className={classes['accountManagement__field_container']}>
                        <label>Weryfikacja hasła </label>
                        <input type="text" className={classes['accountManagement__input']} placeholder="weryfikacja hasła" disabled></input>
                    </div>
                </div>
                <div className={classes['accountManagement__button_container']}>
                    <Button type="submit" onClick={handlePasswordChange} text="Zapisz"/>
                    <Button type="submit" text="Anuluj"/>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default AccountManagement
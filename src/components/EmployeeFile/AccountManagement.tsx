import React from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import Button from '../Utils/Button'
import classes from './AccountManagement.module.scss'

const AccountManagement: React.FC = () => {
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
                        <input type="text" className={classes['accountManagement__input']} placeholder="Wprowadź stare hasło"></input>
                    </div>
                    <div className={classes['accountManagement__field_container']}>
                        <label>Nowe hasło </label>
                        <input type="text" className={classes['accountManagement__input']} placeholder="Wprowadź nowe hasło"></input>
                    </div>
                    <div className={classes['accountManagement__field_container']}>
                        <label>Weryfikacja hasła </label>
                        <input type="text" className={classes['accountManagement__input']} placeholder="weryfikacja hasła" disabled></input>
                    </div>
                </div>
                <div className={classes['accountManagement__button_container']}>
                    {/* zrobic komponenty z tych buttonow */}
                    <Button type="submit" text="Zapisz"/>
                    <Button type="submit" text="Anuluj"/>

                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default AccountManagement
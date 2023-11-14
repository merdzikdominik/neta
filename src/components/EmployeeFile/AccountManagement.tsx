import React from 'react'

const AccountManagement: React.FC = () => {
    return (
        <section>
            <div>
                <h1>Uzytkownicy w aplikacji - MODYFIKACJA</h1>
            </div>
            <div>
                <div>
                    <label>Login </label>
                    <input type="text" placeholder="Adres email"></input>
                </div>
                <div>
                    <label>Stare hasło </label>
                    <input type="text" placeholder="Stare hasło"></input>
                </div>
                <div>
                    <label>Nowe hasło </label>
                    <input type="text" placeholder="Nowe hasło"></input>
                </div>
                <div>
                    <label>Weryfikacja hasła </label>
                    <input type="text" placeholder="weryfikacja hasła" disabled></input>
                </div>
            </div>
            <div>
                <button>Zapisz</button>
                <button>Anuluj</button>
            </div>
        </section>
    )
}

export default AccountManagement
import React, { useState, useEffect } from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import PasswordStrengthBar from 'react-password-strength-bar'
import Button from '../Utils/Button'
import classes from './AccountManagement.module.scss'

const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

const AccountManagement: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false)
    const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>('');

    const token = localStorage.getItem('authToken') || ''

    useEffect(() => {
        const fetchLoggedInUserEmail = async () => {
          try {
            if (token) {
              const response = await fetch('http://127.0.0.1:8000/api/user', {
                method: 'GET',
                headers: {
                  'Authorization': `Token ${token}`,
                },
              });
    
              if (!response.ok) {
                console.log('Błąd podczas pobierania e-maila.');

                return;
              }
    
              const data = await response.json();
              const userEmail = data.email;

              setLoggedInUserEmail(userEmail);
            }
          } catch (error) {
            console.error('Błąd logowania:', error instanceof Error ? error.message : 'Nieznany błąd');
          }
        };
    
        fetchLoggedInUserEmail();
    }, [token]);

    const handleCheckEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)

        if (loggedInUserEmail !== e.target.value) {
            setEmailError('Podany adres e-mail nie jest poprawny.')
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value)
        setPasswordError('')
        setPasswordChanged(false)
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
        setPasswordError('')
        setPasswordChanged(false)
    }

    const handleClearForm = () => {
        setOldPassword('')
        setNewPassword('')
        setPasswordChanged(false)
        setPasswordError('')
        setEmail('')
    }
    
    const handleBadRequest = (response: Object) => {
        switch(Object.keys(response)[0]) {
            case 'old_password':
                return 'Podaj obecne hasło'
            
            case 'detail':
                return 'Stare hasło jest niepoprawne.'
            
            default: 
                return ''
        }
    }

    const handleSubmit = async () => {
        try {
          if (token) {
            if (oldPassword === '' && newPassword === '') return

            if (oldPassword === newPassword) {
                setPasswordError('Hasła nie mogą być takie same.');
                return;
            }
    
            if (!isPasswordValid(newPassword)) {
              setPasswordError('Nowe hasło nie spełnia wymagań złożoności.');
              return;
            }
    
            if (loggedInUserEmail !== email) {
              setEmailError('Podany adres e-mail nie jest poprawny.');
              return;
            }
    
            const response = await fetch('http://127.0.0.1:8000/api/password_change', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
              },
              body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
              }),
            });
    
            if (response.ok) {
              console.log('Hasło zostało pomyślnie zmienione.')
              setPasswordChanged(true);
            } 
            
            else if (response.status === 400) {
                const res = await response.json()
                const data = handleBadRequest(res)

                setPasswordError(data)
            } else {
              console.log('Błąd podczas zmiany hasła.');

              setPasswordChanged(false);
            }
          }
        } catch (error) {
          console.log(`Wystąpił błąd: ${error}`)
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
                        <input 
                            type="text" 
                            className={classes['accountManagement__input']} 
                            placeholder="Wprowadź adres email" 
                            value={email}
                            onChange={handleCheckEmail}
                        />
                    </div>
                    {emailError && <p className={classes['accountManagement__message-error']}>{emailError}</p>}
                    <div className={classes['accountManagement__field_container']}>
                        <label>Stare hasło </label>
                        <input
                            type="password" 
                            className={classes['accountManagement__input']} 
                            placeholder="Wprowadź stare hasło"
                            value={oldPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className={classes['accountManagement__field_container']}>
                        <label>Nowe hasło </label>
                        <input
                            type="password"
                            className={classes['accountManagement__input']}
                            placeholder="Wprowadź nowe hasło"
                            value={newPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    {passwordError && <p className={classes['accountManagement__message-error']}>{passwordError}</p>}
                    {passwordChanged && <p className={classes['accountManagement__message-success']}>Hasło zostało pomyślnie zmienione!</p>}
                    <div className={classes['accountManagement__field_container']}>
                        <label>Weryfikacja hasła </label>
                        <PasswordStrengthBar 
                            style={{ width: '160px' }}
                            password={newPassword}
                            scoreWordStyle={{ color: '#fff' }}
                            shortScoreWord={newPassword.length !== 0 ? 'za krótkie' : ''}
                            barColors={['#ddd', '#ef4836', '#FFAE00', '#00FBFF', '#00FF46']}
                            scoreWords={['bardzo słabe', 'słabe', 'średnie', 'mocne', 'bardzo mocne']}
                        />
                    </div>
                </div>
                <div className={classes['accountManagement__button_container']}>
                    <Button type="submit" background="white" onClick={handleSubmit} text="Zapisz"/>
                    <Button type="submit" background="white" onClick ={handleClearForm} text="Wyczyść"/>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default AccountManagement
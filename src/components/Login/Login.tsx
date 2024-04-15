import React, { useState } from 'react';
import EmailValidator from 'email-validator';
import classes from './Login.module.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const login = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (!data || !data.token) {
          console.log('Brak danych o użytkowniku lub tokenie');
          return;
        }
        
        localStorage.setItem('authToken', data.token);

        setLoginError(undefined);

        window.location.reload()


      } else {
        console.log(response);
        setLoginError('Błąd logowania. Sprawdź wprowadzone dane.');
      }
    } catch (error) {
      console.error('Błąd logowania:', error instanceof Error ? error.message : 'Nieznany błąd');
      setLoginError('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrorEmail(!EmailValidator.validate(email));
    setErrorPassword(password === '');

    if (!errorEmail && !errorPassword) {
      login();
    }
  };

  return (
    <main className={classes['main']}>
      <div className={classes['container']}>
        <div className={classes['left-panel']}>
          <h1 className={classes['left-panel__title']}>Logowanie</h1>
          <p className={classes['left-panel__description']}>
            Zaloguj się do swojego profilu, aby móc zarządzać swoimi urlopami i danymi ewidencyjnymi.
          </p>
        </div>
        <div className={classes['right-panel']}>
          <form className={classes['right-panel__form']} onSubmit={submit} noValidate>
            <div className={classes['right-panel__form__section']}>
              <input
                type="text"
                id="email"
                className={(errorEmail ? classes['error'] : '') as string}
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className={classes['right-panel__form__section__label']}>
                <span className={classes['right-panel__form__section__label__content']}>
                  {errorEmail ? '' : 'Adres email'}
                </span>
              </label>
            </div>
            {errorEmail && <div className={classes['message-error']}>Wprowadź poprawny adres.</div>}

            <div className={classes['right-panel__form__section']}>
              <input
                type="password"
                id="password"
                className={(errorPassword ? classes['error'] : '') as string}
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className={classes['right-panel__form__section__label']}>
                <span className={classes['right-panel__form__section__label__content']}>
                  {errorPassword ? '' : 'Hasło'}
                </span>
              </label>
            </div>
            {errorPassword && <div className={classes['message-error']}>Hasło nie może być puste.</div>}

            {loginError && <div className={classes['message-error']}>{loginError}</div>}

            <button type="submit" className={classes['right-panel__form__btn']}>
              Zaloguj
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
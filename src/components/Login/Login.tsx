import React, { useState } from 'react'
import EmailValidator from 'email-validator'
import classes from './Login.module.scss'

const Login: React.FC = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorFirstname, setErrorFirstname] = useState(false);
  const [errorLastname, setErrorLastname] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    firstname === '' ? setErrorFirstname(true) : setErrorFirstname(false);
    lastname === '' ? setErrorLastname(true) : setErrorLastname(false);
    !EmailValidator.validate(email) ? setErrorEmail(true) : setErrorEmail(false);
    password === '' ? setErrorPassword(true) : setErrorPassword(false);
  };

  return (
    <main>
      <div className={classes["container"]}>
        <div className={classes["left-panel"]}>
          <h1 className={classes["left-panel__title"]}>Learn to code by watching others</h1>
          <p className={classes["left-panel__description"]}>
            See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.
          </p>
        </div>
        <div className={classes["right-panel"]}>
          <div className={classes["right-panel__top-box"]}>
            Try it free 7 days <span>then $20/mo. thereafter</span>
          </div>
          <form className={classes["right-panel__form"]} onSubmit={submit} noValidate>
            <div className={classes["right-panel__form__section"]}>
              <input
                type="text"
                id="firstname"
                className={classes[`right-panel__form__section__input ${errorFirstname ? 'error' : ''}`]}
                autoComplete="off"
                required
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label htmlFor="firstname" className={classes["right-panel__form__section__label"]}>
                <span className={classes["right-panel__form__section__label__content"]}>
                  {errorFirstname ? '' : 'First Name'}
                </span>
              </label>
            </div>
            {errorFirstname && <div className={classes["message-error"]}>First Name cannot be empty</div>}

            <div className={classes["right-panel__form__section"]}>
              <input
                type="text"
                id="lastname"
                className={classes[`right-panel__form__section__input ${errorLastname ? 'error' : ''}`]}
                autoComplete="off"
                required
                onChange={(e) => setLastname(e.target.value)}
              />
              <label htmlFor="lastname" className={classes["right-panel__form__section__label"]}>
                <span className={classes["right-panel__form__section__label__content"]}>
                  {errorLastname ? '' : 'Last Name'}
                </span>
              </label>
            </div>
            {errorLastname && <div className={classes["message-error"]}>Last Name cannot be empty</div>}

            <div className={classes["right-panel__form__section"]}>
              <input
                type="text"
                id="email"
                className={classes[`right-panel__form__section__input ${errorEmail ? 'error' : ''}`]}
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className={classes["right-panel__form__section__label"]}>
                <span className={classes["right-panel__form__section__label__content"]}>
                  {errorEmail ? '' : 'Email Address'}
                </span>
              </label>
            </div>
            {errorEmail && <div className={classes["message-error"]}>Looks like this is not an email</div>}

            <div className={classes["right-panel__form__section"]}>
              <input
                type="password"
                id="password"
                className={classes[`right-panel__form__section__input ${errorPassword ? 'error' : ''}`]}
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className={classes["right-panel__form__section__label"]}>
                <span className={classes["right-panel__form__section__label__content"]}>
                  {errorPassword ? '' : 'Password'}
                </span>
              </label>
            </div>
            {errorPassword && <div className={classes["message-error"]}>Password cannot be empty</div>}

            <button type="submit" className={classes["right-panel__form__btn"]}>
              Claim your free trial
            </button>
            <div className={classes["right-panel__form__terms"]}>
              By clicking the button, you are agreeing to our&nbsp;
              <span>Terms and Services</span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;

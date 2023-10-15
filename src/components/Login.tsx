import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Register from './Register';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setEmail('')
    setPassword('')
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
      Nie masz konta? <Link to='/rejestracja'>Zarejestruj się</Link>
    </div>
  );
};

export default Login;
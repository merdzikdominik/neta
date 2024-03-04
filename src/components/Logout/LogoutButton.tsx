import React from 'react';
import {InlineIcon, } from '@iconify/react'
import { Link } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/logout', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                });

                if (response.ok) {
                    localStorage.removeItem('authToken');

                    window.location.reload()
                } else {
                    console.error('Błąd podczas wylogowywania');
                }

            } catch (error) {
                console.error('Nierozpoznany błąd:', error);
            }
        }
    };

    return (
        <li onClick={handleLogout}>
            <Link to='/'>
                <InlineIcon style={{fontSize: '18px'}} icon="ic:baseline-logout" /> Wyloguj
            </Link>
        </li>
    );
};

export default LogoutButton;

import React from 'react';
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
                    // Pomyślnie wylogowano użytkownika
                    localStorage.removeItem('authToken');

                    window.location.reload()
                    // Tutaj możesz przekierować użytkownika na stronę logowania
                    // window.location.href = '/'; // Przykładowa przekierowanie na stronę logowania
                } else {
                    // Obsługa błędu
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
                <i className="ion-ios-color-filter-outline"></i>Wyloguj
            </Link>
        </li>
    );
};

export default LogoutButton;

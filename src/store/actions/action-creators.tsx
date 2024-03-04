import { INotification } from '../types';

export const sendNotifications = async (data: INotification, token: string) => {
    if (token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/all_notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Wyslano powiadomienie')
            } else {
                console.log(data)
                console.error('Nie wysłano notyfikacji');

            }

        } catch (error) {
            console.error(error);
        }
    }
};
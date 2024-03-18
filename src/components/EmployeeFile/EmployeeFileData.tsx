import React, { useEffect, useState } from 'react';
import Nav from '../Utils/Nav';
import InteractiveBackground from '../Utils/InteractiveBackground';
import classes from './EmployeeFileData.module.scss';

export interface IResidenceData {
    city: string;
    postal_code: string;
    post: string;
    municipal_commune: string;
    voivodeship: string;
    country: string;
    street: string;
    house_number: string;
    flat_number: string;
    mobile_number: string;
}

interface IUserResidenceData {
    permanent_residence: IResidenceData;
    second_residence: IResidenceData;
}

export interface IUserInfo {
    first_name: string;
    second_name: string;
    last_name: string;
    birth_date: string;
    // mobile_number: string;
    email: string;
    age: number;
    employment_start_date: string;
    employment_end_date: string;
    role: string;
    education: string;
    permanent_residence: string;
    second_residence: string;
    // user_residence_data?: IUserResidenceData;
    correspondence_address: string;
    tax_office: string;
    annual_settlement_address: string;
    nfz_branch: string;
    id_data: string;
    id_given_by: string;
    date: string;
    is_superuser: string | null;
    last_login: string;
}

const EmployeeFileData: React.FC = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        first_name: '',
        second_name: '',
        last_name: '',
        birth_date: '',
        // mobile_number: '',
        email: '',
        age: 0,
        employment_start_date: '',
        employment_end_date: '',
        role: '',
        education: '',
        permanent_residence: '',
        second_residence: '',
        correspondence_address: '',
        tax_office: '',
        annual_settlement_address: '',
        nfz_branch: '',
        id_data: '',
        id_given_by: '',
        date: '',
        is_superuser: null,
        last_login: ''
    });

    const fieldsMap: Record<keyof IUserInfo, string> = {
        first_name: 'Imię',
        second_name: 'Drugie imię',
        last_name: 'Nazwisko',
        birth_date: 'Data urodzenia',
        // mobile_number: 'Nr telefonu',
        email: 'Adres email',
        age: 'Wiek',
        employment_start_date: 'Data rozpoczęcia pracy',
        employment_end_date: 'Data zakończenia pracy',
        role: 'Stanowisko',
        education: 'Wykształcenie',
        // user_residence_data: 'Dane zamieszkania',
        permanent_residence: 'Adres zamieszkania',
        second_residence: 'Adres zameldowania',
        correspondence_address: 'Adres do korespondencji',
        tax_office: 'Urząd skarbowy',
        annual_settlement_address: 'Adres rozliczenia rocznego',
        nfz_branch: 'Oddział NFZ',
        id_data: 'Seria i numer dowodu osobistego',
        id_given_by: 'Wydany przez',
        date: 'Data wydania dokumentu',
        is_superuser: 'Administrator',
        last_login: 'Ostatnie logowanie'
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user', {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`Błąd pobierania danych użytkownika: ${response.statusText}`);
                }
        
                const userData = await response.json();

                console.log(userData)

                const permanentResidence: IResidenceData = {
                    ...userData,
                    city: userData.city_permanent_residence,
                    postal_code: userData.postal_code_permanent_residence,
                    post: userData.post_permanent_residence,
                    municipal_commune: userData.municipal_commune_permanent_residence,
                    voivodeship: userData.voivodeship_permanent_residence,
                    country: userData.country_permanent_residence,
                    street: userData.street_permanent_residence,
                    house_number: userData.house_number_permanent_residence,
                    flat_number: userData.flat_number_permanent_residence,
                    mobile_number: userData.mobile_number_permanent_residence
                }

                const secondResidence: IResidenceData = {
                    ...userData,
                    city: userData.city_second_residence,
                    postal_code: userData.postal_code_second_residence,
                    post: userData.post_second_residence,
                    municipal_commune: userData.municipal_commune_second_residence,
                    voivodeship: userData.voivodeship_second_residence,
                    country: userData.country_second_residence,
                    street: userData.street_second_residence,
                    house_number: userData.house_number_second_residence,
                    flat_number: userData.flat_number_second_residence,
                    mobile_number: userData.mobile_number_second_residence
                }

                const correspondenceData: IResidenceData = {
                    ...userData,
                    city: userData.city_correspondence,
                    postal_code: userData.postal_code_correspondence,
                    post: userData.post_correspondence,
                    municipal_commune: userData.municipal_commune_correspondence,
                    voivodeship: userData.voivodeship_correspondence,
                    country: userData.country_correspondence,
                    street: userData.street_correspondence,
                    house_number: userData.house_number_correspondence,
                    flat_number: userData.flat_number_correspondence,
                    mobile_number: userData.mobile_number_correspondence
                }

                const permanentResidenceFormatted = `${permanentResidence.street} ${permanentResidence.house_number} ${permanentResidence.flat_number} | ${permanentResidence.postal_code} | ${permanentResidence.post} | ${permanentResidence.country} | ${permanentResidence.voivodeship} | ${permanentResidence.municipal_commune} | ${permanentResidence.mobile_number}`
                const secondResidenceFormatted = `${secondResidence.street} ${secondResidence.house_number} ${secondResidence.flat_number} | ${secondResidence.postal_code} | ${secondResidence.post} | ${secondResidence.country} | ${secondResidence.voivodeship} | ${secondResidence.municipal_commune} | ${secondResidence.mobile_number}`
                const correspondenceDataFormatted = `${correspondenceData.street} ${correspondenceData.house_number} ${correspondenceData.flat_number} | ${correspondenceData.postal_code} | ${correspondenceData.post} | ${correspondenceData.country} | ${correspondenceData.voivodeship} | ${correspondenceData.municipal_commune} | ${correspondenceData.mobile_number}`

                setUserInfo(prev => ({
                    ...prev,
                    first_name: userData.first_name,
                    second_name: userData.second_name,
                    last_name: userData.last_name,
                    birth_date: userData.birth_date,
                    email: userData.email,
                    age: userData.age,
                    employment_start_date: userData.employment_start_date,
                    employment_end_date: userData.employment_end_date,
                    role: userData.role,
                    education: userData.education,
                    permanent_residence: permanentResidenceFormatted.includes('null') ? 'Nie wypełniono' : permanentResidenceFormatted,
                    second_residence: secondResidenceFormatted.includes('null') ? 'Nie wypełniono' : secondResidenceFormatted,
                    correspondence_address: userData.correspondence_address !== null ? userData.correspondence_address : correspondenceDataFormatted.includes('null') ? 'Nie wypełniono' : correspondenceDataFormatted,
                    tax_office: userData.tax_office,
                    annual_settlement_address: userData.annual_settlement_address,
                    nfz_branch: userData.nfz_branch,
                    id_data: userData.id_data,
                    id_given_by: userData.id_given_by,
                    date: userData.id_date,
                    is_superuser: userData.is_superuser ? 'Tak' : 'Nie',
                    last_login: userData.last_login       
                }));
                
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Błąd:', error.message);
                } else {
                    console.error('Nierozpoznany błąd:', error);
                }
            } 
        }

    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // useEffect(() => {
    //     console.log(userInfo)
    // }, [userInfo])

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['employeeFileData__container']}>
                <div className={classes['employeeFileData__header']}>
                    <h1>Kartoteka Pracownika</h1>
                </div>
                <div className={classes['employeeFileData__data_container']}>
                    {Object.entries(userInfo).map(([field, content]) => (
                        <div key={field}>
                            <span>{fieldsMap[field as keyof IUserInfo]}: </span>
                            <span>{content}</span>
                        </div>
                    ))}

                </div>
            </section>
            <InteractiveBackground />
        </div>
    );
};

export default EmployeeFileData;

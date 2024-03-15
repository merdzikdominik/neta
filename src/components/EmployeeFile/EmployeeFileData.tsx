import React, { useEffect, useState } from 'react';
import Nav from '../Utils/Nav';
import InteractiveBackground from '../Utils/InteractiveBackground';
import classes from './EmployeeFileData.module.scss';

export interface IUserInfo {
    first_name: string;
    second_name: string;
    last_name: string;
    birth_date: string;
    mobile_number: string;
    email: string;
    age: number;
    employment_start_date: string;
    employment_end_date: string;
    role: string;
    education: string;
    user_residence_data?: {
        permanent_residence: {
            city: string;
            postal_code: string;
            post: string;
            municipal_commune: string;
            voivodeship: string;
            county: string;
            street: string;
            house_number: string;
            flat_number: string;
            mobile_number: string;
        };
        second_residence: {
            city: string;
            postal_code: string;
            post: string;
            municipal_commune: string;
            voivodeship: string;
            county: string;
            street: string;
            house_number: string;
            flat_number: string;
            mobile_number: string;
        };
    };
    correspondence_address: string | null;
    tax_office: string;
    annual_settlement_address: string;
    nfz_branch: string;
    id_data: string;
    id_given_by: string;
    date: string;
    is_superuser: string | null;
    last_login: string;
}

interface IUserResidenceData {
    permanentResidence: {
        city: string;
        postalCode: string;
        post: string;
        municipalCommune: string;
        voivodeship: string;
        county: string;
        street: string;
        houseNumber: string;
        flatNumber: string;
        mobileNumber: string;
    };
    secondResidence: {
        city: string;
        postalCode: string;
        post: string;
        municipalCommune: string;
        voivodeship: string;
        county: string;
        street: string;
        houseNumber: string;
        flatNumber: string;
        mobileNumber: string;
    };
}

const EmployeeFileData: React.FC = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        first_name: '',
        second_name: '',
        last_name: '',
        birth_date: '',
        mobile_number: '',
        email: '',
        age: 0,
        employment_start_date: '',
        employment_end_date: '',
        role: '',
        education: '',
        user_residence_data: {
            permanent_residence: {
                city: '',
                postal_code: '',
                post: '',
                municipal_commune: '',
                voivodeship: '',
                county: '',
                street: '',
                house_number: '',
                flat_number: '',
                mobile_number: '',
            },
            second_residence: {
                city: '',
                postal_code: '',
                post: '',
                municipal_commune: '',
                voivodeship: '',
                county: '',
                street: '',
                house_number: '',
                flat_number: '',
                mobile_number: '',
            },
        },
        correspondence_address: null,
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
        mobile_number: 'Nr telefonu',
        email: 'Adres email',
        age: 'Wiek',
        employment_start_date: 'Data rozpoczęcia pracy',
        employment_end_date: 'Data zakończenia pracy',
        role: 'Stanowisko',
        education: 'Wykształcenie',
        user_residence_data: '',
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

                setUserInfo(prev => ({
                    ...prev,
                    first_name: userData.first_name,
                    second_name: userData.second_name,
                    last_name: userData.last_name,
                    birth_date: userData.birth_date,
                    mobile_number: userData.mobile_number,
                    email: userData.email,
                    age: userData.age,
                    employment_start_date: userData.employment_start_date,
                    employment_end_date: userData.employment_end_date,
                    role: userData.role,
                    education: userData.education,
                    user_residence_data: userData.user_residence_data ? userData.user_residence_data.permanent_residence : userData.user_residence_data.second_residence,
                    correspondence_address: userData.correspondence_address,
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
                        {typeof content === 'string' || typeof content === 'number' ? (
                            <span>{content}</span>
                        ) : (
                            content && typeof content !== 'boolean' && (content as IUserResidenceData).permanentResidence && (content as IUserResidenceData).secondResidence && (
                                <div>
                                    <span>{(content as IUserResidenceData).permanentResidence.city}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.postalCode}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.post}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.municipalCommune}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.voivodeship}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.county}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.street}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.houseNumber}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.flatNumber}</span>
                                    <span>{(content as IUserResidenceData).permanentResidence.mobileNumber}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.city}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.postalCode}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.post}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.municipalCommune}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.voivodeship}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.county}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.street}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.houseNumber}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.flatNumber}</span>
                                    <span>{(content as IUserResidenceData).secondResidence.mobileNumber}</span>
                                </div>
                            )
                        )}
                    </div>
                ))}
                </div>
            </section>
            <InteractiveBackground />
        </div>
    );
};

export default EmployeeFileData;

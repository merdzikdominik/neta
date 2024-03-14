import React, { useEffect, useState } from 'react'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './EmployeeFileData.module.scss'

export interface IUserInfo {
    user: {
        firstName: string;
        secondName: string;
        lastName: string;
        birthDate: string;
        mobileNumber: string;
        email: string;
        age: number;
        employmentStartDate: string;
        employmentEndDate: string;
        role: string;
        education: string;
        userResidenceData: {
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
        };
        correspondenceAddress: string | null;
        taxOffice: string;
        annualSettlementAddress: string;
        nfzBranch: string;
        idData: string;
        idGivenBy: string;
        date: string;
    };
}


const EmployeeFileData: React.FC = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        user: {
            firstName: '',
            secondName: '',
            lastName: '',
            birthDate: '',
            mobileNumber: '',
            email: '',
            age: 0,
            employmentStartDate: '',
            employmentEndDate: '',
            role: '',
            education: '',
            userResidenceData: {
                permanentResidence: {
                    city: '',
                    postalCode: '',
                    post: '',
                    municipalCommune: '',
                    voivodeship: '',
                    county: '',
                    street: '',
                    houseNumber: '',
                    flatNumber: '',
                    mobileNumber: '',
                },
                secondResidence: {
                    city: '',
                    postalCode: '',
                    post: '',
                    municipalCommune: '',
                    voivodeship: '',
                    county: '',
                    street: '',
                    houseNumber: '',
                    flatNumber: '',
                    mobileNumber: '',
                },
            },
            correspondenceAddress: null,
            taxOffice: '',
            annualSettlementAddress: '',
            nfzBranch: '',
            idData: '',
            idGivenBy: '',
            date: '',
        },
    });

    const fieldsMap: Record<keyof IUserInfo['user'], string> = {
        firstName: 'Imię',
        secondName: 'Drugie imię',
        lastName: 'Nazwisko',
        birthDate: 'Data urodzenia',
        mobileNumber: 'Nr telefonu',
        email: 'Adres email',
        age: 'Wiek',
        employmentStartDate: 'Data rozpoczęcia pracy',
        employmentEndDate: 'Data zakończenia pracy',
        role: 'Stanowisko',
        education: 'Wykształcenie',
        userResidenceData: '', // zmieniono na pusty ciąg znaków
        correspondenceAddress: 'Adres do korespondencji',
        taxOffice: 'Urząd skarbowy',
        annualSettlementAddress: 'Adres rozliczenia rocznego',
        nfzBranch: 'Oddział NFZ',
        idData: 'Seria i numer dowodu osobistego',
        idGivenBy: 'Wydany przez',
        date: 'Data',
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
                })
    
                if (!response.ok) {
                    throw new Error(`Błąd pobierania danych użytkownika: ${response.statusText}`);
                }
        
                const userData = await response.json();

                setUserInfo(prev => ({
                    ...prev,
                    user: {
                        firstName: userData.first_name,
                        secondName: userData.second_name,
                        lastName: userData.last_name,
                        birthDate: userData.birth_date,
                        mobileNumber: userData.mobile_number,
                        email: userData.email,
                        age: userData.age,
                        employmentStartDate: userData.employment_start_date,
                        employmentEndDate: userData.employment_end_date,
                        role: userData.role,
                        education: userData.education,
                        userResidenceData: userData.user_residence_data,
                        correspondenceAddress: userData.correspondence_address,
                        taxOffice: userData.tax_office,
                        annualSettlementAddress: userData.annualSettlement_address,
                        nfzBranch: userData.nfz_branch,
                        idData: userData.id_data,
                        idGivenBy: userData.id_given_by,
                        date: userData.id_date,
                    }                    
                }));
                

                console.log(userData)
    
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Błąd:', error.message);
                } else {
                    console.error('Nierozpoznany błąd:', error);
                }
            } 
        }

    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['employeeFileData__container']}>
                <div className={classes['employeeFileData__header']}>
                    <h1>Kartoteka Pracownika</h1>
                </div>
                <div className={classes['employeeFileData__data_container']}>
                {Object.entries(userInfo.user).map(([field, content]) => (
                    <div key={field}>
                        <span>{fieldsMap[field as keyof IUserInfo['user']]}: </span>
                        {typeof content === 'string' || typeof content === 'number' ? (
                            <span>{content}</span>
                        ) : (
                            content && content.permanentResidence && content.secondResidence && (
                                <div>
                                    <span>{content.permanentResidence.city}</span>
                                    <span>{content.permanentResidence.postalCode}</span>
                                    <span>{content.permanentResidence.post}</span>
                                    <span>{content.permanentResidence.municipalCommune}</span>
                                    <span>{content.permanentResidence.voivodeship}</span>
                                    <span>{content.permanentResidence.county}</span>
                                    <span>{content.permanentResidence.street}</span>
                                    <span>{content.permanentResidence.houseNumber}</span>
                                    <span>{content.permanentResidence.flatNumber}</span>
                                    <span>{content.permanentResidence.mobileNumber}</span>
                                    <span>{content.secondResidence.city}</span>
                                    <span>{content.secondResidence.postalCode}</span>
                                    <span>{content.secondResidence.post}</span>
                                    <span>{content.secondResidence.municipalCommune}</span>
                                    <span>{content.secondResidence.voivodeship}</span>
                                    <span>{content.secondResidence.county}</span>
                                    <span>{content.secondResidence.street}</span>
                                    <span>{content.secondResidence.houseNumber}</span>
                                    <span>{content.secondResidence.flatNumber}</span>
                                    <span>{content.secondResidence.mobileNumber}</span>
                                </div>
                            )
                        )}
                    </div>
                ))}

                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default EmployeeFileData

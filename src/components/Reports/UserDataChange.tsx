import React, { useState, useRef, useEffect } from 'react'
import { IUserInfo } from '../EmployeeFile/EmployeeFileData'
import ResidenceForm from './ResidenceForm'
import Nav from '../Utils/Nav'
import InteractiveBackground from '../Utils/InteractiveBackground'
import classes from './UserDataChange.module.scss'
import Button from '../Utils/Button'

interface IUserResidenceData {
    city: string,
    postalCode: string,
    post: string,
    municipalCommune: string,
    voivodeship: string,
    county: string,
    street: string,
    houseNumber: string,
    flatNumber: string,
    mobileNumber: string
}

interface IUserData {
    surname: string,
    correspondenceAddress: null | string | IUserResidenceData | undefined,
    taxOffice: string,
    annualSettlementAddress: null | string | undefined,
    nfzBranch: string,
    idData: string,
    idGivenBy: string,
    date: string
}

interface IUserResidenceGroup {
    permanentResidence: IUserResidenceData,
    secondResidence: IUserResidenceData
}

interface IFormFill extends IUserData {
    userResidenceData: IUserResidenceGroup
}

const userInitial: IUserResidenceData = {
    city: '',
    postalCode: '',
    post: '',
    municipalCommune: '',
    voivodeship: '',
    county: '',
    street: '',
    houseNumber: '',
    flatNumber: '',
    mobileNumber: ''
}

const UserDataChange: React.FC = () => {
    const [isCheckedFirstResidence, setIsCheckedFirstResidence] = useState<boolean>(false)
    const [isCheckedSecondResidence, setIsCheckedSecondResidence] = useState<boolean>(false)
    const [isCheckedCorrespondenceAddressAnother, setIsCheckedCorrespondenceAddressAnother] = useState<boolean>(false)
    
    const [permanentResidenceData, setPermanentResidenceData] = useState<IUserResidenceData>(userInitial)
    const [secondResidenceData, setSecondResidenceData] = useState<IUserResidenceData>(userInitial)
    const [correspondenceAddress, setCorrespondenceAddress] = useState<IUserResidenceData>(userInitial)

    const checkboxRadioCorrespondenceRef = useRef<HTMLInputElement | null>(null)
    const checkboxRadioAnnualRef = useRef<HTMLInputElement | null>(null)

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
    
    
    const [formData, setFormData] = useState<IFormFill>({
        surname: '',
        userResidenceData: {
            permanentResidence: permanentResidenceData,
            secondResidence: secondResidenceData
        },
        correspondenceAddress: correspondenceAddress,
        taxOffice: '',
        annualSettlementAddress: '',
        nfzBranch: '',
        idData: '',
        idGivenBy: '',
        date: ''
    })

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
                    user_residence_data: {
                        permanent_residence: {
                            city: userData.user_residence_data?.permanent_residence?.city,
                            postal_code: userData.user_residence_data?.permanent_residence?.postal_code,
                            post: userData.user_residence_data?.permanent_residence?.post,
                            municipal_commune: userData.user_residence_data?.permanent_residence?.municipal_commune,
                            voivodeship: userData.user_residence_data?.permanent_residence?.voivodeship,
                            county: userData.user_residence_data?.permanent_residence.city?.country,
                            street: userData.user_residence_data?.permanent_residence?.street,
                            house_number: userData.user_residence_data?.permanent_residence?.house_number,
                            flat_number: userData.user_residence_data?.permanent_residence?.flat_number,
                            mobile_number: userData.user_residence_data?.permanent_residence?.mobile_number,
                        },
                        second_residence: {
                            city: userData.user_residence_data?.second_residence?.city,
                            postal_code: userData.user_residence_data?.second_residence?.postal_code,
                            post: userData.user_residence_data?.second_residence?.post,
                            municipal_commune: userData.user_residence_data?.second_residence?.municipal_commune,
                            voivodeship: userData.user_residence_data?.second_residence?.voivodeship,
                            county: userData.user_residence_data?.second_residence?.country,
                            street: userData.user_residence_data?.second_residence?.street,
                            house_number: userData.user_residence_data?.second_residence?.house_number,
                            flat_number: userData.user_residence_data?.second_residence?.flat_number,
                            mobile_number: userData.user_residence_data?.second_residence?.mobile_number,
                        },
                    },
                    correspondence_address: userData.user_residence_data?.correspondence_address || '' || null,
                    tax_office: userData.user_residence_data?.tax_office,
                    annual_settlement_address: userData.user_residence_data?.annual_settlement_address,
                    nfz_branch: userData.user_residence_data?.nfz_branch,
                    id_data: userData.user_residence_data?.id_data,
                    id_given_by: userData.user_residence_data?.id_given_by,
                    date: userData.user_residence_data?.id_date,
                    is_superuser: prev.is_superuser,
                    last_login: prev.last_login      
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

    const handleOverallForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            userResidenceData: {
                permanentResidence: permanentResidenceData,
                secondResidence: secondResidenceData
            },
            correspondenceAddress: isCheckedCorrespondenceAddressAnother ? correspondenceAddress : checkboxRadioCorrespondenceRef.current?.textContent,
            annualSettlementAddress: checkboxRadioAnnualRef.current?.textContent,
            [event.target.name]: event.target.value
        }))
    }

    const handlePermanentUserResidence = (userData: IUserResidenceData) => {
        setPermanentResidenceData(userData)
    }

    const handleSecondUserResidence = (userData: IUserResidenceData) => {
        setSecondResidenceData(userData)
    }

    const handleCorrespondenceUser = (userData: IUserResidenceData) => {
        setCorrespondenceAddress(userData)
    }

    const handleCheckboxFirstResidenceChange = () => {
        setIsCheckedFirstResidence(!isCheckedFirstResidence)
    }

    const handleCheckboxSecondResidenceChange = () => {
        setIsCheckedSecondResidence(!isCheckedSecondResidence)
    }

    const handleCheckboxRadioChange = (event: React.ChangeEvent<HTMLInputElement>, checkbox: React.RefObject<HTMLInputElement>, setData?: React.Dispatch<boolean>) => {
        const selectedCheckbox = event.target.value

        if (checkbox.current) {
            checkbox.current.textContent = selectedCheckbox

            if (setData) setData(false)

            console.log(checkbox.current.textContent)
        }
    }

    const handleCheckboxRadioCorrespondenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxRadioChange(event, checkboxRadioCorrespondenceRef, setIsCheckedCorrespondenceAddressAnother)

        setIsCheckedCorrespondenceAddressAnother(false)

        if (checkboxRadioCorrespondenceRef.current?.textContent === 'inny (kliknij, aby wypełnić)') {
            setIsCheckedCorrespondenceAddressAnother(true)
            console.log('przeszlo')
        }
    }

    const handleCheckboxRadioAnnualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxRadioChange(event, checkboxRadioAnnualRef)
    }

    const handleSubmit = () => {
        console.log(formData)

        setFormData({
            surname: '',
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
                    mobileNumber: ''
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
                    mobileNumber: ''
                }
            },
            correspondenceAddress: '',
            taxOffice: '',
            annualSettlementAddress: '',
            nfzBranch: '',
            idData: '',
            idGivenBy: '',
            date: ''
        })
    }

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['userDataChange__container']}>
                <div className={classes['userDataChange__content']}>
                    <div className={classes['userDataChange__header']}>
                        <h1>WNIOSEK ZMIANY DANYCH IDENTYFIKACYJNYCH I/LUB EWIDENCYJNYCH</h1>
                    </div>
                    <div className={classes['userDataChange__container-data']}>
                        <span>Imię: { userInfo.first_name }</span>
                        <span>Nazwisko: { userInfo.last_name }</span>
                        <span>Stanowisko pracy: { userInfo.role }</span>

                        <span>Proszę dokonać zmian następujących danych ewidencyjnych/identyfikacyjnych (wypełnić tylko pola które ulegają zmianie):</span> 

                        <div className={classes['reports-data-change__form']}>
                            <div>
                                <label>
                                    1. Nazwisko
                                    <input type="text" placeholder="Wprowadź nazwisko" required name="surname" onChange={handleOverallForm} />
                                </label>
                            </div>

                            <div className={classes['userDataChange__checkbox']}>
                                <div className={classes['userDataChange__checkbox-field-label']}>
                                    2. Miejsce stałego zameldowania <input type="checkbox" checked={isCheckedFirstResidence} name="firstResidenceChecked" 
                                    onChange={handleCheckboxFirstResidenceChange} />
                                </div>
                                { isCheckedFirstResidence ? <ResidenceForm onChange={handlePermanentUserResidence} /> : null }
                            </div>

                            <div className={classes['userDataChange__checkbox']}>
                                <div className={classes['userDataChange__checkbox-field-label']}>
                                    3. Adres zamieszkania (jeśli jest iny niż adres stałego zameldowania) <input type="checkbox" checked={isCheckedSecondResidence} name="secondResidenceChecked" onChange={handleCheckboxSecondResidenceChange} />
                                </div>

                                { isCheckedSecondResidence ? <ResidenceForm onChange={handleSecondUserResidence} /> : null }
                            </div>

                            4. Adres do korespondencji

                            <div>
                                <div className={classes['checkbox-wrapper']}>
                                    <input 
                                        type="radio" 
                                        value="taki, jak adres stałego zameldowania"
                                        ref={checkboxRadioCorrespondenceRef}
                                        name="correspondence" 
                                        onChange={handleCheckboxRadioCorrespondenceChange} 
                                    /> 
                                    <label>taki, jak adres stałego zameldowania</label>
                                    <input 
                                        type="radio" 
                                        value="taki, jak adres zamieszkania"
                                        ref={checkboxRadioCorrespondenceRef}
                                        name="correspondence" 
                                        onChange={handleCheckboxRadioCorrespondenceChange} 
                                    /> 
                                    <label>taki, jak adres zamieszkania</label>
                                    <input 
                                        type="radio" 
                                        value="inny (kliknij, aby wypełnić)"
                                        ref={checkboxRadioCorrespondenceRef}
                                        name="correspondence" 
                                        onChange={handleCheckboxRadioCorrespondenceChange} 
                                    /> 
                                    <label>inny (kliknij, aby wypełnić)</label>
                                </div>
                                { isCheckedCorrespondenceAddressAnother ? <ResidenceForm onChange={handleCorrespondenceUser} /> : null }

                            </div>
                            
                            <div className={classes['userDataChange__tax-office']}>
                                5. Urząd skarbowy (nazwa i adres)
                                <input type="text" required name="taxOffice" placeholder="Wprowadź nazwę urzędu" onChange={handleOverallForm} />
                            </div>
                            <div>
                                6. Adres, który ma być uwzględniony w rozliczeniu rocznym to:
                                <div className={classes['checkbox-wrapper']}>
                                    <input 
                                        type="radio"
                                        ref={checkboxRadioAnnualRef}
                                        value="adres stałego zameldowania"
                                        name="annual" 
                                        onChange={handleCheckboxRadioAnnualChange} 
                                    /> 
                                    <label>adres stałego zameldowania</label>
                                    <input 
                                        type="radio" 
                                        ref={checkboxRadioAnnualRef}
                                        value="adres zamieszkania"
                                        name="annual" 
                                        onChange={handleCheckboxRadioAnnualChange} 
                                    /> 
                                    <label>adres zamieszkania</label>
                                    <input 
                                        type="radio" 
                                        ref={checkboxRadioAnnualRef}
                                        value="adres do korespondencji"
                                        name="annual" 
                                        onChange={handleCheckboxRadioAnnualChange}
                                    /> 
                                    <label>adres do korespondencji</label>
                                </div>
                            </div>
                            <div className={classes['userDataChange__nfz']}>
                                7. Oddział NFZ
                                <input type="text" name="nfzBranch" required placeholder="Wprowadź oddział" onChange={handleOverallForm}/>
                            </div>
                            <div className={classes['userDataChange__text-input-wrap']}>
                                8. Seria i numer dowodu osobistego
                                <input type="text" name="idData" required placeholder="Wprowadź serię dowodu" onChange={handleOverallForm}/>
                                Wydany przez
                                <input type="text" name="idGivenBy" required placeholder="Wprowadź organ" onChange={handleOverallForm}/>
                                w dniu
                                <input type="date" name="date" required onChange={handleOverallForm} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes['userDataChange__button_container']}>
                    <Button type="button" text="Zatwierdź zmiany" onClick={() => handleSubmit()}/>
                </div>
            </section>
            <InteractiveBackground />
        </div>
    )
}

export default UserDataChange

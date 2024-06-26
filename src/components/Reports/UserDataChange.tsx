import React, { useState, useRef, useEffect } from 'react'
import { IUserInfo } from '../EmployeeFile/EmployeeFileData'
import { toast } from 'react-toastify'
import { sendNotifications } from '../../store/actions/action-creators'
import { motion } from 'framer-motion'
import uuid from 'react-uuid'
import ResidenceForm from './ResidenceForm'
import Nav from '../Utils/Nav'
import Background from '../Utils/Background'
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

export interface IForm {
    id?: string,
    surname: string,
    city_permanent_residence: string,
    postal_code_permanent_residence: string,
    post_permanent_residence: string,
    municipal_commune_permanent_residence: string,
    voivodeship_permanent_residence: string,
    country_permanent_residence: string,
    street_permanent_residence: string,
    house_number_permanent_residence: string,
    flat_number_permanent_residence: string,
    mobile_number_permanent_residence: string
    city_second_residence: string,
    postal_code_second_residence: string,
    post_second_residence: string,
    municipal_commune_second_residence: string,
    voivodeship_second_residence: string,
    country_second_residence: string,
    street_second_residence: string,
    house_number_second_residence: string,
    flat_number_second_residence: string,
    mobile_number_second_residence: string
    city_correspondence_residence: string,
    postal_code_correspondence_residence: string,
    post_correspondence_residence: string,
    municipal_commune_correspondence_residence: string,
    voivodeship_correspondence_residence: string,
    country_correspondence_residence: string,
    street_correspondence_residence: string,
    house_number_correspondence_residence: string,
    flat_number_correspondence_residence: string,
    mobile_number_correspondence_residence: string
    tax_office: string,
    correspondence_address: null | string | undefined
    annual_settlement_address: null | string | undefined,
    nfz_branch: string,
    id_data: string,
    id_given_by: string,
    id_date: string
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

export const handleGetCurrentTime = () => {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0'); 
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const currentDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return currentDateTimeString
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
    
    
    const [formData, setFormData] = useState<IForm>({
        surname: '',
        city_permanent_residence: '',
        postal_code_permanent_residence: '',
        post_permanent_residence: '',
        municipal_commune_permanent_residence: '',
        voivodeship_permanent_residence: '',
        country_permanent_residence: '',
        street_permanent_residence: '',
        house_number_permanent_residence: '',
        flat_number_permanent_residence: '',
        mobile_number_permanent_residence: '',
        city_second_residence: '',
        postal_code_second_residence: '',
        post_second_residence: '',
        municipal_commune_second_residence: '',
        voivodeship_second_residence: '',
        country_second_residence: '',
        street_second_residence: '',
        house_number_second_residence: '',
        flat_number_second_residence: '',
        mobile_number_second_residence: '',
        city_correspondence_residence: '',
        postal_code_correspondence_residence: '',
        post_correspondence_residence: '',
        municipal_commune_correspondence_residence: '',
        voivodeship_correspondence_residence: '',
        country_correspondence_residence: '',
        street_correspondence_residence: '',
        house_number_correspondence_residence: '',
        flat_number_correspondence_residence: '',
        mobile_number_correspondence_residence: '',
        tax_office: '',
        correspondence_address: '',
        annual_settlement_address: '',
        nfz_branch: '',
        id_data: '',
        id_given_by: '',
        id_date: ''
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

                setUserInfo(userData)
    
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
            [event.target.name]: event.target.value,
            correspondence_address: checkboxRadioCorrespondenceRef.current?.textContent,
            annual_settlement_address: checkboxRadioAnnualRef.current?.textContent,
            city_permanent_residence: permanentResidenceData.city,
            postal_code_permanent_residence: permanentResidenceData.postalCode,
            post_permanent_residence: permanentResidenceData.post.length > 0 ? permanentResidenceData.post : '',
            municipal_commune_permanent_residence: permanentResidenceData.municipalCommune,
            voivodeship_permanent_residence: permanentResidenceData.voivodeship,
            country_permanent_residence: permanentResidenceData.county,
            street_permanent_residence: permanentResidenceData.street,
            house_number_permanent_residence: permanentResidenceData.houseNumber,
            flat_number_permanent_residence: permanentResidenceData.flatNumber,
            mobile_number_permanent_residence: permanentResidenceData.mobileNumber,
            city_second_residence: secondResidenceData.city,
            postal_code_second_residence: secondResidenceData.postalCode,
            post_second_residence: secondResidenceData.post,
            municipal_commune_second_residence: secondResidenceData.municipalCommune,
            voivodeship_second_residence: secondResidenceData.voivodeship,
            country_second_residence: secondResidenceData.county,
            street_second_residence: secondResidenceData.street,
            house_number_second_residence: secondResidenceData.houseNumber,
            flat_number_second_residence: secondResidenceData.flatNumber,
            mobile_number_second_residence: secondResidenceData.mobileNumber,
            city_correspondence_residence: correspondenceAddress.city,
            postal_code_correspondence_residence: correspondenceAddress.postalCode,
            post_correspondence_residence: correspondenceAddress.post,
            municipal_commune_correspondence_residence: correspondenceAddress.municipalCommune,
            voivodeship_correspondence_residence: correspondenceAddress.voivodeship,
            country_correspondence_residence: correspondenceAddress.county,
            street_correspondence_residence: correspondenceAddress.street,
            house_number_correspondence_residence: correspondenceAddress.houseNumber,
            flat_number_correspondence_residence: correspondenceAddress.flatNumber,
            mobile_number_correspondence_residence: correspondenceAddress.mobileNumber
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
        handleCheckboxRadioChange(event, checkboxRadioCorrespondenceRef)

        setIsCheckedCorrespondenceAddressAnother(false)

        if (checkboxRadioCorrespondenceRef.current?.textContent === 'inny (kliknij, aby wypełnić)') {
            setIsCheckedCorrespondenceAddressAnother(true)
            console.log('przeszlo')
        }

        setFormData(prev => ({
            ...prev,
            correspondence_address: checkboxRadioCorrespondenceRef.current!.textContent,
        }))
    }

    const handleCheckboxRadioAnnualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckboxRadioChange(event, checkboxRadioAnnualRef)

        setFormData(prev => ({
            ...prev,
            annual_settlement_address: checkboxRadioAnnualRef.current!.textContent,
        }))
    }

    const formDataToSend = {
        surname: formData.surname,
        city_permanent_residence: permanentResidenceData.city.length > 0 ? permanentResidenceData.city : '',
        postal_code_permanent_residence: permanentResidenceData.postalCode.length > 0 ? permanentResidenceData.postalCode : '',
        post_permanent_residence: permanentResidenceData.post.length > 0 ? permanentResidenceData.post : '',
        municipal_commune_permanent_residence: permanentResidenceData.municipalCommune.length > 0 ? permanentResidenceData.municipalCommune : '',
        voivodeship_permanent_residence: permanentResidenceData.voivodeship.length > 0 ? permanentResidenceData.voivodeship : '',
        country_permanent_residence: permanentResidenceData.county.length > 0 ? permanentResidenceData.county : '',
        street_permanent_residence: permanentResidenceData.street.length > 0 ? permanentResidenceData.street : '',
        house_number_permanent_residence: permanentResidenceData.houseNumber.length > 0 ? permanentResidenceData.houseNumber : '',
        flat_number_permanent_residence: permanentResidenceData.flatNumber.length > 0 ? permanentResidenceData.flatNumber : '',
        mobile_number_permanent_residence: permanentResidenceData.mobileNumber.length > 0 ? permanentResidenceData.mobileNumber : '',
        city_second_residence: secondResidenceData.city.length > 0 ? secondResidenceData.city : '',
        postal_code_second_residence: secondResidenceData.postalCode.length > 0 ? secondResidenceData.postalCode : '',
        post_second_residence: secondResidenceData.post.length > 0 ? secondResidenceData.post : '',
        municipal_commune_second_residence: secondResidenceData.municipalCommune.length > 0 ? secondResidenceData.municipalCommune : '',
        voivodeship_second_residence: secondResidenceData.voivodeship.length > 0 ? secondResidenceData.voivodeship : '',
        country_second_residence: secondResidenceData.county.length > 0 ? secondResidenceData.county : '',
        street_second_residence: secondResidenceData.street.length > 0 ? secondResidenceData.street : '',
        house_number_second_residence: secondResidenceData.houseNumber.length > 0 ? secondResidenceData.houseNumber : '',
        flat_number_second_residence: secondResidenceData.flatNumber.length > 0 ? secondResidenceData.flatNumber : '',
        mobile_number_second_residence: secondResidenceData.mobileNumber.length > 0 ? secondResidenceData.mobileNumber : '',
        city_correspondence_residence: correspondenceAddress.city.length > 0 ? correspondenceAddress.city : '',
        postal_code_correspondence_residence: correspondenceAddress.postalCode.length > 0 ? correspondenceAddress.postalCode : '',
        post_correspondence_residence: correspondenceAddress.post.length > 0 ? correspondenceAddress.post : '',
        municipal_commune_correspondence_residence: correspondenceAddress.municipalCommune.length > 0 ? correspondenceAddress.municipalCommune : '',
        voivodeship_correspondence_residence: correspondenceAddress.voivodeship.length > 0 ? correspondenceAddress.voivodeship : '',
        country_correspondence_residence: correspondenceAddress.county.length > 0 ? correspondenceAddress.county : '',
        street_correspondence_residence: correspondenceAddress.street.length > 0 ? correspondenceAddress.street : '',
        house_number_correspondence_residence: correspondenceAddress.houseNumber.length > 0 ? correspondenceAddress.houseNumber : '',
        flat_number_correspondence_residence: correspondenceAddress.flatNumber.length > 0 ? correspondenceAddress.flatNumber : '',
        mobile_number_correspondence_residence: correspondenceAddress.mobileNumber.length > 0 ? correspondenceAddress.mobileNumber : '',
        correspondence_address: checkboxRadioCorrespondenceRef.current?.textContent,
        tax_office: formData.tax_office,
        annual_settlement_address: checkboxRadioAnnualRef.current?.textContent,
        nfz_branch: formData.nfz_branch,
        id_data: formData.id_data,
        id_given_by: formData.id_given_by,
        id_date: formData.id_date,
    }

    const handleSubmit = async () => {
        console.log(formDataToSend)
        const token = localStorage.getItem('authToken')
    
        if (token) {
            try {
                const responseUserData = await fetch('http://127.0.0.1:8000/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                });
    
                if (!responseUserData.ok) {
                    toast.error('Wystąpił bład podczas pobierania Twoich danych.')
                    throw new Error(`Błąd pobierania danych użytkownika: ${responseUserData.statusText}`);
                }
    
                const userData = await responseUserData.json();
                const { first_name, last_name, email } = userData;
    
                const response = await fetch('http://127.0.0.1:8000/api/create_data_change_request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    body: JSON.stringify({
                        user: {
                            first_name,
                            last_name,
                            email
                        },
                        ...formDataToSend
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Błąd podczas wysyłania danych.');
                }

                sendNotifications({ id: uuid(), label: `Nowy wniosek o zmianę danych ewidencyjnych dla ${first_name} ${last_name} | (${handleGetCurrentTime()})` }, token)
    
                toast.success('Dane zostały pomyślnie wysłane.');


            } catch (error) {
                toast.error('Wystąpił błąd podczas wysyłania danych.');
                console.error('Błąd:', error);
            }
        }

        setFormData({
            surname: '',
            city_permanent_residence: '',
            postal_code_permanent_residence: '',
            post_permanent_residence: '',
            municipal_commune_permanent_residence: '',
            voivodeship_permanent_residence: '',
            country_permanent_residence: '',
            street_permanent_residence: '',
            house_number_permanent_residence: '',
            flat_number_permanent_residence: '',
            mobile_number_permanent_residence: '',
            city_second_residence: '',
            postal_code_second_residence: '',
            post_second_residence: '',
            municipal_commune_second_residence: '',
            voivodeship_second_residence: '',
            country_second_residence: '',
            street_second_residence: '',
            house_number_second_residence: '',
            flat_number_second_residence: '',
            mobile_number_second_residence: '',
            city_correspondence_residence: '',
            postal_code_correspondence_residence: '',
            post_correspondence_residence: '',
            municipal_commune_correspondence_residence: '',
            voivodeship_correspondence_residence: '',
            country_correspondence_residence: '',
            street_correspondence_residence: '',
            house_number_correspondence_residence: '',
            flat_number_correspondence_residence: '',
            mobile_number_correspondence_residence: '',
            correspondence_address: '',
            tax_office: '',
            annual_settlement_address: '',
            nfz_branch: '',
            id_data: '',
            id_given_by: '',
            id_date: ''
        });
    
        toast.info('Wniosek zmiany danych został wystawiony.');
    }    

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}>
            <div className={classes['main']}>
                <Nav />
                <section className={classes['userDataChange__container']}>
                    <div className={classes['userDataChange__content']}>
                        <div className={classes['userDataChange__header']}>
                            <h1>WNIOSEK ZMIANY DANYCH IDENTYFIKACYJNYCH I/LUB EWIDENCYJNYCH</h1>
                        </div>
                        <div className={classes['userDataChange__container-data']}>
                            <span><b>Imię: </b>{ userInfo.first_name }</span>
                            <span><b>Nazwisko: </b>{ userInfo.last_name }</span>
                            <span><b>Stanowisko pracy: </b>{ userInfo.role }</span>

                            <span><b>Proszę dokonać zmian następujących danych ewidencyjnych/identyfikacyjnych (wypełnić tylko pola które ulegają zmianie): </b></span> 

                            <div className={classes['reports-data-change__form']}>
                                <div>
                                    <label>
                                        <b>1. Nazwisko</b>
                                        <input type="text" placeholder="Wprowadź nazwisko" name="surname" required onChange={handleOverallForm} />
                                    </label>
                                </div>

                                <div className={classes['userDataChange__checkbox']}>
                                    <div className={classes['userDataChange__checkbox-field-label']}>
                                        <b>2. Miejsce stałego zameldowania </b><input type="checkbox" checked={isCheckedFirstResidence} name="firstResidenceChecked" 
                                        onChange={handleCheckboxFirstResidenceChange} />
                                    </div>
                                    { isCheckedFirstResidence ? <ResidenceForm onChange={handlePermanentUserResidence} /> : null }
                                </div>

                                <div className={classes['userDataChange__checkbox']}>
                                    <div className={classes['userDataChange__checkbox-field-label']}>
                                        <b>3. Adres zamieszkania (jeśli jest iny niż adres stałego zameldowania)</b> <input type="checkbox" checked={isCheckedSecondResidence} name="secondResidenceChecked" onChange={handleCheckboxSecondResidenceChange} />
                                    </div>

                                    { isCheckedSecondResidence ? <ResidenceForm onChange={handleSecondUserResidence} /> : null }
                                </div>

                                <b>4. Adres do korespondencji</b>

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
                                    <b>5. Urząd skarbowy (nazwa i adres)</b>
                                    <input type="text" required name="tax_office" placeholder="Wprowadź nazwę urzędu" onChange={handleOverallForm} />
                                </div>
                                <div>
                                    <b>6. Adres, który ma być uwzględniony w rozliczeniu rocznym to:</b>
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
                                    7. <b>Oddział NFZ</b>
                                    <input type="text" name="nfz_branch" placeholder="Wprowadź oddział" onChange={handleOverallForm}/>
                                </div>
                                <div className={classes['userDataChange__text-input-wrap']}>
                                    8. <b>Seria i numer dowodu osobistego</b>
                                    <input type="text" name="id_data" placeholder="Wprowadź serię dowodu" onChange={handleOverallForm}/>
                                    Wydany przez
                                    <input type="text" name="id_given_by" placeholder="Wprowadź organ" onChange={handleOverallForm}/>
                                    w dniu
                                    <input type="date" name="id_date" onChange={handleOverallForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes['userDataChange__button_container']}>
                        <Button type="button" background="white" text="Zatwierdź zmiany" onClick={() => handleSubmit()}/>
                    </div>
                </section>
                <Background />
            </div>
        </motion.div>
    )
}

export default UserDataChange

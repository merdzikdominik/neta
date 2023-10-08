import React, { useState, useRef, useEffect } from 'react'
import ResidenceForm from './ResidenceForm'
import classes from './ReportsDataChange.module.css'

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

const Test: React.FC = () => {
    const [isCheckedFirstResidence, setIsCheckedFirstResidence] = useState<boolean>(false)
    const [isCheckedSecondResidence, setIsCheckedSecondResidence] = useState<boolean>(false)
    const [isCheckedCorrespondenceAddressAnother, setIsCheckedCorrespondenceAddressAnother] = useState<boolean>(false)

    const checkboxRadioCorrespondenceRef = useRef<HTMLInputElement | null>(null)
    const checkboxRadioAnnualRef = useRef<HTMLInputElement | null>(null)
    // const timeoutRef = useRef(null)
    
    const [permanentResidenceData, setPermanentResidenceData] = useState<IUserResidenceData>({
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
    })
    
    const [secondResidenceData, setSecondResidenceData] = useState<IUserResidenceData>({
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
    })
    
    const [correspondenceAddress, setCorrespondenceAddress] = useState<IUserResidenceData>({
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
    })
    
    const [formData, setFormData] = useState<IFormFill>({
        surname: '',
        userResidenceData: {
            permanentResidence: permanentResidenceData,
            secondResidence: secondResidenceData
        },
        correspondenceAddress: null,
        taxOffice: '',
        annualSettlementAddress: '',
        nfzBranch: '',
        idData: '',
        idGivenBy: '',
        date: ''
    })

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(formData)
    }

    const handleOverallForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => {
            return {
                ...prev,
                userResidenceData: {
                    permanentResidence: permanentResidenceData,
                    secondResidence: secondResidenceData
                },
                correspondenceAddress: isCheckedCorrespondenceAddressAnother ? correspondenceAddress : checkboxRadioCorrespondenceRef.current?.textContent,
                annualSettlementAddress: checkboxRadioAnnualRef.current?.textContent,
                [event.target.name]: event?.target.value
            }
        })
    }

    const handleResidenceDataTemplate = (event: React.ChangeEvent<HTMLInputElement>, setData: React.Dispatch<React.SetStateAction<IUserResidenceData>>) => {
        setData(prev => ({
            ...prev,
            [event.target.name]: event?.target.value
        }))

    }

    const handleCatchUserResidence = (object: IUserResidenceData) => {
        console.log(object)
    }

    const handleResidenceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isCheckedFirstResidence) {
            handleResidenceDataTemplate(event, setPermanentResidenceData)
        } 
        if (isCheckedSecondResidence) {
            handleResidenceDataTemplate(event, setSecondResidenceData)
        }
        if (isCheckedCorrespondenceAddressAnother) {
            handleResidenceDataTemplate(event, setCorrespondenceAddress)
        }
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


    // const handleSaveDataToJsonFile = (data: Object) => {
    //     try {
    //       const jsonData = JSON.stringify(data, null, 2)
          
    //       const filePath = 'D:\Microsoft VS Code\projects\react-ts-teta2\src\components\jstest.json'

    //       fs.writeFileSync(filePath, jsonData)
      
    //       console.log('Dane zostały zapisane do pliku JSON.')
    //     } catch (error) {
    //         console.error('Wystąpił błąd podczas zapisywania danych do pliku JSON:', error)
    //     }
    // }

    useEffect(() => {
        try {
            // if (permanentResidenceData['city'].length === 0 || 
            //     secondResidenceData['city'].length === 0 || 
            //     correspondenceAddress['city'].length === 0) {

            //         console.log('nie wypelniono pol')
            //         return
            // }

            const userDataStorage = [
                permanentResidenceData,
                secondResidenceData,
                correspondenceAddress
            ]

            // for (let i=0; i<userDataStorage.length; i++) {
            //     if (userDataStorage[i]['city'].length > 0) {
            //         console.log(userDataStorage)
            //     }
            // }
            console.log(userDataStorage)

            // console.log(formData)

            // console.log('ZAPISANO DANE DO FORMATU JSON':)
        } catch (error) {
            console.error('USE EFFECT SIE WYJEBAL')
        }
    }, [permanentResidenceData, secondResidenceData, correspondenceAddress, formData])

    return (
        <div>
            <h1>WNIOSEK ZMIANY DANYCH IDENTYFIKACYJNYCH I/LUB EWIDENCYJNYCH</h1>
            <p>[IMIE] [NAZWISKO]</p>
            <p>Imię i nazwisko</p>
            <p>Imię i nazwisko</p>
            <p>[TYTUŁ STANOWISKA]</p>
            <p>Stanowisko pracy</p>

            <span>Proszę dokonać zmian następujących danych ewidencyjnych/identyfikacyjnych (wypełnić tylko pola które ulegają zmianie):</span> 

            <form onSubmit={handleSubmit} className={classes['reports-data-change__form']}>
                <div>
                    <label>
                        1. Nazwisko
                        <input type="text" placeholder="Wprowadź nazwisko" required name="surname" onChange={handleOverallForm} />
                    </label>
                </div>

                2. Miejsce stałego zameldowania <input type="checkbox" checked={isCheckedFirstResidence} name="firstResidenceChecked" 
                onChange={handleCheckboxFirstResidenceChange} />
                
                { isCheckedFirstResidence ? <ResidenceForm userResidence={handleCatchUserResidence} /> : null }

                3. Adres zamieszkania (jeśli jest iny niż adres stałego zameldowania) <input type="checkbox" checked={isCheckedSecondResidence} name="secondResidenceChecked" onChange={handleCheckboxSecondResidenceChange} />

                { isCheckedSecondResidence ? <ResidenceForm userResidence={handleCatchUserResidence} /> : null }

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
                    { isCheckedCorrespondenceAddressAnother ? <ResidenceForm userResidence={handleCatchUserResidence} /> : null }

                </div>
                
                <div>
                    <label>
                        5. Urząd skarbowy (nazwa i adres)
                        <input type="text" required name="taxOffice" placeholder="Wprowadź nazwę urzędu" onChange={handleOverallForm} />
                    </label>
                </div>
                <div>
                    {/* NAMES NIE WIEM CZY NIE DO WYJEBANIA */}
                    6. Adres, który ma być uwzględniony w rozliczeniu rocznym to:
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
                <div>
                    7. Oddział NFZ
                    <input type="text" name="nfzBranch" required placeholder="Wprowadź oddział" onChange={handleOverallForm}/>
                </div>
                <div className={classes['grid']}>
                    <div className={classes['input-wrapper']}>
                        <label>
                            8. Seria i numer dowodu osobistego
                            <input type="text" name="idData" required placeholder="Wprowadź serię dowodu" onChange={handleOverallForm}/>
                        </label>
                    </div>
                    <div className={classes['input-wrapper']}>
                        <label>
                            Wydany przez
                            <input type="text" name="idGivenBy" required placeholder="Wprowadź organ" onChange={handleOverallForm}/>
                        </label>
                    </div>
                    <div className={classes['input-wrapper']}>
                        <label>
                            w dniu
                            <input type="date" name="date" required/>
                        </label>
                    </div>
                </div>
                <button type="submit">Zatwierdź zmiany</button>
            </form>
        </div>
    )
}

export default Test
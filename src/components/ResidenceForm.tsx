import React, { useState } from 'react'
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

interface IUserResidenceFunction {
    onChange: (data: IUserResidenceData) => void
}

const ResidenceForm: React.FC<IUserResidenceFunction> = ({ onChange }) => {
    const [userData, setUserData] = useState<IUserResidenceData>({
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

    const handleStoreUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({
            ...prev,
            [event.target.name]: event?.target.value,
        }))

        onChange({
            ...userData,
            [event.target.name]: event?.target.value,
        })

    }

    return (

        <div className={classes['reports-data-change__second-position']}>
            <div className={classes['grid']}>
                <div className={classes['input-wrapper']}>
                    <label>
                        Miejscowość
                        <input type="text" placeholder="Wprowadź miejscowość" required name="city" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Kod pocztowy
                        <input type="text" placeholder="Wprowadź kod pocztowy" maxLength={6} required name="postalCode" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Poczta
                        <input type="text" placeholder="Wprowadź pocztę" required name="post" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Gmina
                        <input type="text" placeholder="Wprowadź gminę" required name="municipalCommune" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Województwo
                        <input type="text" placeholder="Wprowadź województwo" required name="voivodeship" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Powiat
                        <input type="text" placeholder="Wprowadź powiat" required name="county" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Ulica
                        <input type="text" placeholder="Wprowadź ulicę" required name='street' onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Nr domu
                        <input type="number" placeholder="Wprowadź nr domu" required name="houseNumber" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Nr mieszkania
                        <input type="number" placeholder="Wprowadź nr mieszkania" required name="flatNumber" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Telefon kontaktowy
                        <input type="text" placeholder="Wprowadź nr telefonu" required name="mobileNumber" onChange={handleStoreUserData} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ResidenceForm
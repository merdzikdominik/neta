import React, { useState, useEffect } from 'react'
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
        const updatedUserData = {
            ...userData,
            [event.target.name]: event.target.value,
        };
    
        setUserData(updatedUserData);
    
        // Przekazujemy aktualny stan `userData` do funkcji onChange
        onChange(updatedUserData);
    }
    

    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
        <div className={classes['reports-data-change__second-position']}>
            <div className={classes['grid']}>
                <div className={classes['input-wrapper']}>
                    <label>
                        Miejscowość
                        <input type="text" placeholder="Wprowadź miejscowość" name="city" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Kod pocztowy
                        <input type="text" placeholder="Wprowadź kod pocztowy" maxLength={6} name="postalCode" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Poczta
                        <input type="text" placeholder="Wprowadź pocztę" name="post" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Gmina
                        <input type="text" placeholder="Wprowadź gminę" name="municipalCommune" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Województwo
                        <input type="text" placeholder="Wprowadź województwo" name="voivodeship" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Powiat
                        <input type="text" placeholder="Wprowadź powiat" name="county" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Ulica
                        <input type="text" placeholder="Wprowadź ulicę" name='street' onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Nr domu
                        <input type="number" placeholder="Wprowadź nr domu" name="houseNumber" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Nr mieszkania
                        <input type="number" placeholder="Wprowadź nr mieszkania" name="flatNumber" onChange={handleStoreUserData} />
                    </label>
                </div>
                <div className={classes['input-wrapper']}>
                    <label>
                        Telefon kontaktowy
                        <input type="text" placeholder="Wprowadź nr telefonu" name="mobileNumber" onChange={handleStoreUserData} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ResidenceForm
import React from 'react'

const EmployeeFileData: React.FC = () => {
    return (
        <section>
            <div>
                <h1>Kartoteka Pracownika</h1>
            </div>
            <div>
                <div>
                    <span>Imię: </span><span>Dominik</span>
                </div>
                <div>
                    <span>Drugie imię: </span><span>Rafał</span>
                </div>
                <div>
                    <span>Nazwisko: </span><span>Merdzik</span>
                </div>
                <div>
                    <span>Data urodzenia: </span><span>28.11.1998</span>
                </div>
                <div>
                    <span>Nr telefonu: </span><span>+48 511210172</span>
                </div>
                <div>
                    <span>Adres email: </span><span>dominik.merdzik@onet.pl</span>
                </div>
                <div>
                    <span>Wiek: </span><span>25</span>
                </div>
                -----------------------------------------------
                <div>
                    <span>Data zatrudnienia: </span><span>20.02.2023</span>
                </div>
                <div>
                    <span>Data rozwiązania umowy: </span><span>10.03.2023</span>
                </div>
                <div>
                    <span>Stanowisko: </span><span>IT Support Engineer</span>
                </div>
                <div>
                    <span>Wykształcenie: </span><span>Inzynier</span>
                </div>
            </div>
        </section>
    )
}

export default EmployeeFileData
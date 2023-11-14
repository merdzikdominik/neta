import React from 'react'

const PaternityLeaveForm: React.FC = () => {
    return (
        <form>
            <div>
                <label>miejscowość</label>
                <input type="text" />
            </div>
            <div>
                <label>data</label>
                <input type="date" />
            </div>
            <div>
                DOMINIK MERDZIK
                imie i nazwisko
                POWSTANCOW SLASKICH 38/6 TARNOWSKIE GORY 42-600
                adres korespondencji
                NAZWA FIMY
                nazwa pracodawcy
            </div>
            <h1>WNIOSEK O URLOP RODZICIELSKI</h1>
            <div>
                <span>Proszę o udzielenie mi urlopu rodzicielskiego w okresie</span>
                <div>
                    <input type="radio" /> jednego tygodnia 
                    <label>od</label>
                    <input type="text" />
                    <label>do</label>
                    <input type="text" />
                </div>
                <div>
                    <input type="radio" /> dwóch tygodni
                    <label>od</label>
                    <input type="text" />
                    <label>do</label>
                    <input type="text" />
                </div>
                <label>W związku z urodzeniem dziecka</label>
                <input type="text" placeholder="Imie i Nazwisko dziecka" />
                <label>urodzonego: </label>
                <input type="date" />
                <input type="radio" />
                <span>Potwierdzam, ze nie korzystałem/am z urlopu rodzicielskiego dla wyzej wymienionego dziecka/dzieci i nie otrzymalem/am w zwiazku z tym zadnych korzyści materialnych</span>
                <input type="radio" />
                <span>Potwierdzam, ze korzystałem/am z urlopu rodzicielskiego w okresie </span>
                <label> od </label>
                <input type="text" />
                <label> do </label>
                <input type="text" />
                <span> i nie otrzymalem/am w zwiazku z tym zadnych korzyści materialnych</span>
                <label>Z powazaniem</label>
                <input type="text" />
            </div>

        </form>
    )
}

export default PaternityLeaveForm
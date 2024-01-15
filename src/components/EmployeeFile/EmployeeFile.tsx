import React from "react"
import Navigation from '../Navigation'
import Nav from "../Utils/Nav"
import InteractiveBackground from "../Utils/InteractiveBackground"

const EmployeeFile: React.FC = () => {

    return (
        <>
            <header>
                <h1>Kartoteka</h1>
            </header>
            <Nav />
            <Navigation />
            <InteractiveBackground />
        </>
    )
}

export default EmployeeFile
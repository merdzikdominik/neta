import React from "react"
import Nav from "../Utils/Nav"
import InteractiveBackground from "../Utils/InteractiveBackground"
import classes from './EmployeeFile.module.scss'

const EmployeeFile: React.FC = () => {

    return (
        <div className={classes['main']}>
            <Nav />
            <section className={classes['employee-file__container']}>

            </section>
            <InteractiveBackground />
        </div>
    )
}

export default EmployeeFile
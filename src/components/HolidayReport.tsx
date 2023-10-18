import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

const HolidayReport: React.FC = () => {
    const location = useLocation()
    const prop = location.state && location.state.prop

    useEffect(() => {
        console.log(prop)
    }, [prop])

    return (
        <>
            Holiday Report prop: {prop['dateFrom']} {prop['dateTo']}
            PYTHON PART HERE TO GENERATE THE CALENDAR WITH IMPORT CALENDAR
        </>
    )
}

export default HolidayReport
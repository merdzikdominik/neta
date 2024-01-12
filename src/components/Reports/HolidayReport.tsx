import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/types"
import CalendarHolder from "../Utils/CalendarHolder"

const HolidayReport: React.FC = () => {
    // const { dateFrom, dateTo } = useSelector((state: RootState) => state.dates)

    // useEffect(() => {
    //     if (dateFrom && dateTo) {
    //         console.log(dateFrom, dateTo)
    //     }
        
    // }, [dateFrom, dateTo])

    return (
        <CalendarHolder />
    )
}

export default HolidayReport
import React, { useState, useEffect } from "react";
import CalendarHolder from "../Utils/CalendarHolder";
import classes from './HolidayApprovedRequests.module.scss';
import { IHolidayRequest, IRequestUser } from "../Admin/AdminModule";

export interface IHoliday {
    dateFrom: string;
    dateTo: string;
    user: IRequestUser[];
    color_hex: string | string[];
}

const HolidayApprovedRequests: React.FC = () => {
    const [approvedDates, setApprovedDates] = useState<IHoliday[]>([]);

    useEffect(() => {
        const fetchHolidayPlans = async () => {
            const token = localStorage.getItem('authToken');

            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/list_holiday_approved_requests', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();

                        const originalDates: IHoliday[] = data.map((holiday: IHolidayRequest) => ({
                            dateFrom: holiday.start_date,
                            dateTo: holiday.end_date,
                            user: [holiday.user],
                            color_hex: holiday.color_hex
                        }));

                        const overlappingDates: IHoliday[] = [];

                        originalDates.forEach((holiday1, index1) => {
                            originalDates.slice(index1 + 1).forEach((holiday2, index2) => {
                                const startDate1 = new Date(holiday1.dateFrom);
                                const endDate1 = new Date(holiday1.dateTo);
                                const startDate2 = new Date(holiday2.dateFrom);
                                const endDate2 = new Date(holiday2.dateTo);

                                if (startDate1 <= endDate2 && startDate2 <= endDate1) {
                                    const overlappingStartDate = startDate1 > startDate2 ? startDate1 : startDate2;
                                    const overlappingEndDate = endDate1 < endDate2 ? endDate1 : endDate2;

                                    const overlappingUsers = extractUsersFromRange([holiday1, holiday2]);
                                    const overlappingColors = extractColorsFromRange([holiday1, holiday2]);

                                    const overlappingRange: IHoliday = {
                                        dateFrom: overlappingStartDate.toISOString().slice(0, 10),
                                        dateTo: overlappingEndDate.toISOString().slice(0, 10),
                                        user: overlappingUsers,
                                        color_hex: overlappingColors
                                    };

                                    overlappingDates.push(overlappingRange);
                                }
                            });
                        });

                        const filteredOverlapping = overlappingDates.filter((holiday, index, array) => {
                            const hasSameDate = array.some((obj, idx) => {
                                if (idx !== index) {
                                    return obj.dateFrom === holiday.dateFrom && obj.dateTo === holiday.dateTo;
                                }
                                return false;
                            });
                        
                            return !hasSameDate;
                        });

                        const mergedDates = mergeOverlappingDates(overlappingDates);

                        setApprovedDates([...originalDates, ...filteredOverlapping, ...mergedDates]);

                    } else {
                        const errorData = await response.json();
                        console.error('Nie wczytano zatwierdzonych wnioskow urlopowych:', errorData);
                    }
                } catch (error) {
                    console.error('Błąd przy wysyłaniu żądania', error);
                }
            }
        };

        fetchHolidayPlans();
    }, []);

    useEffect(() => {   
        console.log(approvedDates);
    }, [approvedDates]);

    const extractUsersFromRange = (range: IHoliday[]): IRequestUser[] => {
        const users: IRequestUser[] = [];
        range.forEach(holiday => {
            holiday.user.forEach(user => {
                const existingUser = users.find(u => u.email === user.email);
                if (!existingUser) {
                    users.push(user);
                }
            });
        });
        return users;
    };

    const extractColorsFromRange = (range: IHoliday[]): string[] => {
        const colors: string[] = [];
        range.forEach(holiday => {
            if (typeof holiday.color_hex === 'string') {
                colors.push(holiday.color_hex);
            } else if (Array.isArray(holiday.color_hex)) {
                holiday.color_hex.forEach(color => {
                    if (!colors.includes(color)) {
                        colors.push(color);
                    }
                });
            }
        });
        return colors;
    };

    const mergeOverlappingDates = (overlappingDates: IHoliday[]): IHoliday[] => {
        const mergedDates: IHoliday[] = [];

        overlappingDates.forEach((date1, index1) => {
            overlappingDates.slice(index1 + 1).forEach(date2 => {
                const startDate1 = new Date(date1.dateFrom);
                const endDate1 = new Date(date1.dateTo);
                const startDate2 = new Date(date2.dateFrom);
                const endDate2 = new Date(date2.dateTo);

                if (startDate1 <= endDate2 && startDate2 <= endDate1) {
                    const overlappingStartDate = startDate1 > startDate2 ? startDate1 : startDate2;
                    const overlappingEndDate = endDate1 < endDate2 ? endDate1 : endDate2;

                    const overlappingUsers = extractUsersFromRange([date1, date2]);
                    const overlappingColors = extractColorsFromRange([date1, date2]);

                    const overlappingRange: IHoliday = {
                        dateFrom: overlappingStartDate.toISOString().slice(0, 10),
                        dateTo: overlappingEndDate.toISOString().slice(0, 10),
                        user: overlappingUsers,
                        color_hex: overlappingColors
                    };

                    const isAlreadyMerged = mergedDates.some(date => {
                        const sameUsers = date.user.every(u => overlappingRange.user.some(ou => ou.email === u.email));
                        if (sameUsers && date.dateFrom === overlappingRange.dateFrom && date.dateTo === overlappingRange.dateTo) {
                            return true;
                        }
                        return false;
                    });

                    if (!isAlreadyMerged) {
                        mergedDates.push(overlappingRange);
                    }
                }
            });
        });

        return mergedDates;
    };

    return (        
        <div className={classes['main']}>
            <section className={classes['holidayApprovedRequests__container']}>
                <CalendarHolder holidayDataProp={approvedDates}/>
            </section>
        </div>
    );
};

export default HolidayApprovedRequests;

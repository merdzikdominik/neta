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

                        const mergedDates = mergeOverlappingDates(overlappingDates);
                        const holidayArray = [...originalDates, ...overlappingDates, ...mergedDates]

                        // console.log(overlappingDates)
                        const groupedByDateRange: Map<string, IHoliday[]> = holidayArray.reduce((acc: Map<string, IHoliday[]>, holiday: IHoliday) => {
                            const key = `${holiday.dateFrom}-${holiday.dateTo}`;
                            if (!acc.has(key)) {
                                acc.set(key, []);
                            }
                            acc.get(key)?.push(holiday);
                            return acc;
                        }, new Map<string, IHoliday[]>());
                        
                        // Wybieranie obiektów z największą tablicą w polu color_hex dla każdego zakresu dat
                        const final: IHoliday[] = Array.from(groupedByDateRange.values()).map(group => {
                            let largest: IHoliday | undefined;
                            group.forEach(holiday => {
                                if (Array.isArray(holiday.color_hex) && (!largest || (Array.isArray(largest.color_hex) && holiday.color_hex.length > largest.color_hex.length))) {
                                    largest = holiday;
                                }
                            });
                            return largest;
                        }).filter((obj): obj is IHoliday => !!obj && Array.isArray(obj.color_hex));
                        
                        // console.log(holidayArray)
                        // console.log(final);

                        const finalArray = [...originalDates, ...final]
                        // console.log(finalArray)

                        setApprovedDates(finalArray);

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
        let merged: IHoliday[] = [];
    
        overlappingDates.forEach(date => {
            if (merged.length === 0) {
                merged.push(date);
            } else {
                const overlapping: IHoliday[] = [];
    
                merged.forEach(existingDate => {
                    const startDate1 = new Date(date.dateFrom);
                    const endDate1 = new Date(date.dateTo);
                    const startDate2 = new Date(existingDate.dateFrom);
                    const endDate2 = new Date(existingDate.dateTo);
    
                    if (startDate1 <= endDate2 && startDate2 <= endDate1) {
                        const overlappingStartDate = startDate1 > startDate2 ? startDate1 : startDate2;
                        const overlappingEndDate = endDate1 < endDate2 ? endDate1 : endDate2;
    
                        const overlappingUsers = extractUsersFromRange([date, existingDate]);
                        const overlappingColors = extractColorsFromRange([date, existingDate]);
    
                        const overlappingRange: IHoliday = {
                            dateFrom: overlappingStartDate.toISOString().slice(0, 10),
                            dateTo: overlappingEndDate.toISOString().slice(0, 10),
                            user: overlappingUsers,
                            color_hex: overlappingColors
                        };
    
                        overlapping.push(overlappingRange);
                    }
                });
    
                if (overlapping.length > 0) {
                    const combinedOverlappingUsers = overlapping.reduce((acc, curr) => {
                        return [...acc, ...curr.user];
                    }, [] as IRequestUser[]);
                    const uniqueOverlappingUsers = Array.from(new Set(combinedOverlappingUsers.map(user => user.email)))
                        .map(email => combinedOverlappingUsers.find(user => user.email === email) as IRequestUser);
    
                    merged = [
                        ...merged.filter(existingDate => !overlapping.find(overlap => overlap.dateFrom === existingDate.dateFrom && overlap.dateTo === existingDate.dateTo)),
                        {
                            ...overlapping[0],
                            user: uniqueOverlappingUsers
                        }
                    ];
                } else {
                    merged.push(date);
                }
            }
        });
    
        return merged;
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
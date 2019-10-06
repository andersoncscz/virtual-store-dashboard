import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';

const CustomClock = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(
            () => setDate(new Date()),
            1000
        );
        return () => clearInterval(interval)
    }, [date])

    const currentTime = () => {
        const hours = date.getHours().toString().length === 2 ? date.getHours().toString() : '0' + date.getHours().toString()
        const minutes = date.getMinutes().toString().length === 2 ? date.getMinutes().toString() : '0' + date.getMinutes().toString()

        return <h4 className="pt-4 font-weight-bold text-dark">{hours}:{minutes}</h4>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column p-4 shadow-sm bg-white rounded h-100">
            <Clock renderNumbers size={180} value={date}/>
            {currentTime()}
        </div>
    )
}

export default CustomClock;
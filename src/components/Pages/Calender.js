import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className='cs-min-height'>
            <h2 className='text-4xl text-center mb-5 font-bold'>Calender</h2>
            <Calendar className='m-auto' onChange={onChange} value={value} />

        </div>
    );
};

export default Calender;
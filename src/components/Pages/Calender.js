import React, { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className='cs-min-height'>
            <h2 className='text-center text-2xl lg:text-5xl font-bold uppercase p-3 mt-6 mb-6'>Calender</h2>
            <Calendar className='m-auto' onChange={onChange} value={value} />

        </div>
    );
};

export default Calender;
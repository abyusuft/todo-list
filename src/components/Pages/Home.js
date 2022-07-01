import React from 'react';
import list from '../../asset/list.png'
import { Link } from 'react-router-dom';
import { faPerson, faMapLocation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AllTask from './AllTask';

const Home = () => {

    return (
        <div className=''>
            <div className="hero min-h-fit bg-primary py-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={list} className="min-w-md rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold text-white py-8 px-6">Task Done ToDo Manager</h1>
                        <p className="py-6 text-white text-2xl max-w-md px-6">Getting a To-do List for your Work and life became easier with Task Done Todo Manager</p>
                        <span className='btn btn-red text-white border-2 border-white mx-6'><Link to='/todo'> Make your List</Link></span>
                    </div>
                </div>
            </div>


            <div className='my-6'>
                <AllTask></AllTask>
            </div>
            <div>
                <h2 className='text-center text-2xl lg:text-5xl font-bold uppercase p-3 mt-6'> Summury</h2>
                <div className="product-section grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto p-8 mt-5">

                    <div className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <FontAwesomeIcon className='text-6xl text-primary' icon={faMapLocation}></FontAwesomeIcon>
                        </figure>
                        <div className=" text-center p-6">
                            <h2 className="text-2xl">We Serve</h2>
                            <p className='my-5 text-5xl font-bold'>100+</p>
                            <p className='text-2xl'>Countries </p>

                        </div>
                    </div>
                    <div className="card bg-primary text-white shadow-xl">
                        <figure className="px-10 pt-10">
                            <FontAwesomeIcon className='text-6xl text-error' icon={faPerson}></FontAwesomeIcon>
                        </figure>
                        <div className=" text-center p-6">
                            <h2 className="text-2xl">We have</h2>
                            <p className='my-5 text-5xl font-bold'>10M+</p>
                            <p className='text-2xl'>Happy Users </p>

                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <FontAwesomeIcon className='text-6xl text-primary' icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </figure>
                        <div className=" text-center p-6">
                            <h2 className="text-2xl">Daily</h2>
                            <p className='my-5 text-5xl font-bold'>100k+</p>
                            <p className='text-2xl'>List Entry </p>

                        </div>
                    </div>

                </div>
            </div>

        </div >
    );
};

export default Home;
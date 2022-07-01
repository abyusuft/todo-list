import React from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';
import SocialLogin from './SocialLogin';

const Signup = () => {
    const [sendEmailVerification, sending, vError] = useSendEmailVerification(auth);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();
    const [token] = useToken(user);


    if (loading || updating || sending) {
        return <Loading></Loading>
    }

    if (error || uError || vError) {
        toast(`Error: ${error?.message}` || uError?.message)
    }

    if (token || user) {
        navigate('/todo');
    }
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        await sendEmailVerification();
        toast('Verification Email Sent');
        reset();




    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-primary'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-bold">SignUp</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Full Name</span>
                            </label>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Your Name is Required"
                                    }
                                })}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text-alt text-red-500">{errors.name?.type === 'required' && `${errors?.name?.message}`}</span>

                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Your Email</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is Required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text-alt text-red-500">{errors.email?.type === 'required' && `${errors?.email?.message}`}</span>
                                <span className="label-text-alt text-red-500">{errors.email?.type === 'pattern' && `${errors?.email?.message}`}</span>
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Your Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is Required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                                type="password"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text-alt text-red-500">{errors.password?.type === 'required' && `${errors?.password?.message}`}</span>
                                <span className="label-text-alt text-red-500">{errors.password?.type === 'minLength' && `${errors?.password?.message}`}</span>
                            </label>
                        </div>
                        <input type="submit" className='btn btn-primary text-white w-full max-w-xs' value='SignUp' />
                    </form>
                    <p className='mt-4'>Already have an account? <Link to='/login' className='text-primary font-bold'>Login</Link></p>
                </div>

                <div className="divider">OR</div>
                <SocialLogin></SocialLogin>
            </div>


        </div>
    );
};


export default Signup;
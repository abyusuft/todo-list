
import { useForm } from 'react-hook-form';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';
import SocialLogin from './SocialLogin';
import useToken from '../../hooks/useToken';
import { useEffect } from 'react';

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [user1] = useAuthState(auth);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/dashboard";
    const [token] = useToken(user || user1);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    if (error) {
        toast(`Error: ${error?.message}`);
    }
    if (loading) {
        <Loading></Loading>
    }



    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
        reset();
    }


    return (
        <div className='flex justify-center items-center min-h-screen bg-primary'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

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
                        <input type="submit" className='btn btn-primary text-white w-full max-w-xs' value='Login' />
                    </form>
                    <p className='mt-4'>New to Task Done? <Link to='/signup' className='text-primary font-bold'>SignUp</Link></p>
                    <p className='mt-1'>Forgot Your Password? <span style={{ cursor: "pointer" }} className='pointer text-primary font-bold'>Reset</span></p>
                </div>


                <div className="divider">OR</div>
                <SocialLogin></SocialLogin>


            </div>


        </div>
    );
};

export default Login;
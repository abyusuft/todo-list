import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';


const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/todo";
    const [token] = useToken(user);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    if (error) {
        toast(`Error: ${error?.message}`);
    }
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline btn-primary hover:text-white m-5"
        >
            Continute With Google
        </button>
    );
};

export default SocialLogin;
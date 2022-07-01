import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const [user] = useAuthState(auth);
    const { data: userProfile, isLoading, refetch } = useQuery('userProfile', () => fetch(`https://desolate-sierra-98071.herokuapp.com/user/${user?.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }

    }).then(res => {
        if (res.status === 403) {
            toast.error('Unauthorized');
        }
        return res.json()
    }))
    if (isLoading) {
        <Loading></Loading>
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const onSubmit = data => {
        const addTask = {
            email: user?.email,
            name: userProfile?.name,
            task: data?.task,
            detail: data?.detail,
            status: 'pending'
        };

        if (user?.email) {
            fetch(`https://desolate-sierra-98071.herokuapp.com/task`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(addTask)
            })
                .then(res => {
                    if (res.status === 403) {
                        signOut(auth);
                        toast.error('Unauthorized');
                    }
                    return res.json()
                })
                .then(data => {
                    refetch();
                    toast.success(`Task Added Successfully`);
                    navigate('/todo')
                })
        }
    }

    return (
        <div className='cs-min-height'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control flex-row w-full max-w-xl mt-1">
                    <label className="label w-1/2">
                        <span className="label-text font-bold">Task Name</span>
                    </label>
                    <input
                        {...register("task", {
                            required: {
                                value: true,
                                message: "Task is Required"
                            }
                        })}
                        type="text"
                        placeholder='Insert Task Title'
                        className="input input-bordered w-full max-w-xs" />
                </div>
                <label className="label">
                    <span className="label-text-alt text-red-500">{errors.task?.type === 'required' && `${errors?.task?.message}`}</span>
                </label>
                <div className="form-control flex-row w-full max-w-xl mt-2">
                    <label className="label w-1/2">
                        <span className="label-text font-bold">Task Deatil</span>
                    </label>
                    <input
                        {...register("detail")}
                        type="text"
                        placeholder='Type Review'
                        className="input input-bordered w-full max-w-xs" />
                </div>

                <input type="submit" className='btn btn-primary  text-white w-full mx-auto my-5' value='Add Task' />
            </form>
        </div>
    );
};

export default AddTask;
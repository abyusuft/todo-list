import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UpdateTask = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const { taskid } = useParams();
    const { data: task, isLoading, refetch } = useQuery('pendingTask', () => fetch(`http://localhost:5000/task/${taskid}`, {
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

    console.log(task)
    console.log(taskid)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const updateTask = {
            email: user?.email,
            task: data?.task,
            detail: data?.detail,
            status: 'pending'
        };

        if (user?.email) {
            fetch(`http://localhost:5000/update/${taskid}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(updateTask)
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
                    toast.success(`Review Added Successfully`);
                    navigate('/todo');
                })
        }
    }

    return (
        <div className='cs-min-height'>
            <h2 className='font-bold text-center text-4xl mb-5'>Upadte Task</h2>
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
                        placeholder={task?.task}
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
                        placeholder={task?.detail}
                        className="input input-bordered w-full max-w-xs" />
                </div>

                <input type="submit" className='btn btn-primary  text-white w-full mx-auto my-5' value='Update Task' />
            </form>
        </div>
    );
};

export default UpdateTask;
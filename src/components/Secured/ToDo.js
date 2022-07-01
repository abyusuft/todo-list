import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ToDo = () => {
    const [user] = useAuthState(auth);
    const { data: task, isLoading, refetch } = useQuery('pendingTask', () => fetch(`http://localhost:5000/pendingtask/${user?.email}`, {
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

    // console.log(task);
    const handleComplete = (id) => {
        console.log(id)
        if (user?.email) {
            fetch(`http://localhost:5000/markcomplete/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403) {
                        signOut(auth);
                        toast.error('Unauthorized');
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.modifiedCount > 0) {
                        refetch();
                        toast.success(`Task Completed`);
                    }
                })
        }
    }
    const navigate = useNavigate();
    const handleEdit = (id) => {
        navigate(`/update/${id}`);
    }
    return (
        <div className='cs-min-height'>
            <h2 className='text-center text-4xl font-bold mb-3'>Task To-Do List : </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Mark as Done</th>
                            <th>Task</th>
                            <th>Detail</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task?.map(m => <tr key={m?._id}>
                                <td><input type="checkbox" onClick={() => handleComplete(m?._id)} /></td>
                                <td>{m?.task}</td>
                                <td>{m?.detail}</td>
                                <td><button onClick={() => handleEdit(m?._id)} className='btn btn-primary text-white btn-sm'>Edit</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ToDo;
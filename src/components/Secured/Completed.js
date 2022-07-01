import React from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const Completed = () => {
    const [user] = useAuthState(auth);
    const { data: task, isLoading, refetch } = useQuery('completed', () => fetch(`https://desolate-sierra-98071.herokuapp.com/completed/${user?.email}`, {
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
        refetch();
    }
    return (
        <div className='cs-min-height'>
            <h2 className='text-center text-4xl font-bold mb-3'>Completed Task </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task?.map(m => <tr key={m._id}>
                                <td>{m.task}</td>
                                <td>{m.detail}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Completed;
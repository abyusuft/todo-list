import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';

const AllTask = () => {
    const { data: task, isLoading, refetch } = useQuery('task', () => fetch(`https://desolate-sierra-98071.herokuapp.com/task`, {
        method: 'GET'

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
        <div>
            <h2 className='text-center text-2xl lg:text-5xl font-bold uppercase p-3 mt-6 mb-6'>Task List </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Added By</th>
                            <th>Task</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task?.map(m => <tr key={m._id}>
                                <td>{m.email}</td>
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

export default AllTask;
import React, { useEffect, useState } from 'react';
import { completedTasks, deleteTodo } from '../../api/endpoints';
import {FiTrash} from 'react-icons/fi';
import Nodata from '../Nodata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompletedTask = () => {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        completedTasks()
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleDelete = (id) => {
        console.log(id)
        deleteTodo(id)
            .then((result) => {
                console.log(result)
                const updatedTodos = tasks.filter((todo) => todo._id !== id);
                setTasks(updatedTodos);
                toast.success('Todo deleted successfully!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to delete todo. Please try again.');
            });
    };




    return (
        <div className="text-white bg-stone-600 h-screen">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <h2 className='text-xl m-2'>Completed Tasks</h2>
            {
                tasks?.length > 0 ?
                <div className="mx-auto p-4">
                {tasks.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex items-center p-4 border bg-gray-700 rounded-md mb-4"
                    >
                        <div className="flex-grow">
                            <h4 className="font-semibold">{todo.title}</h4>
                            <p className="text-gray-400">{todo.description}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDelete(todo._id)}
                            >
                                <FiTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            :

            <Nodata/>
            

            }
            
        </div>
    );
};

export default CompletedTask;

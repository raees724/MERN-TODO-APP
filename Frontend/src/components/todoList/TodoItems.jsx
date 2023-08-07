import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { getTodos, updateTodo } from '../../api/endpoints';

const TodoItems = ({ todos, setTodos, handleEdit, handleDelete }) => {
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    console.log(todos)

    useEffect(() => {
        fetchTodos(currentPage);
    }, [currentPage]);

    const fetchTodos = (page) => {
        getTodos(page, 10)
            .then((response) => {
                console.log(response.data)
                const { docs, totalDocs } = response.data;
                setTodos(docs);
                setTotalPages(Math.ceil(totalDocs / 10));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startEditing = (todo) => {
        setEditingTodoId(todo._id);
        setEditedTitle(todo.title);
        setEditedDescription(todo.description);
    };

    const cancelEditing = () => {
        setEditingTodoId(null);
        setEditedTitle('');
        setEditedDescription('');
    };

    const saveEditing = () => {
        handleEdit(editingTodoId, editedTitle, editedDescription);
        cancelEditing();
    };

    const handleStatusChange = (id) => {
        const credentials = {
            id,
            isCompleted: true
        };
        updateTodo(credentials).then((data) => {
            console.log(data);
            getTodos().then((data) => {
                setTodos(data?.data?.docs);
            });
        });
    };

    return (
        <div className="mt-8">
            {todos?.map((todo) => (
                <div
                    key={todo._id}
                    className="flex items-center p-4 border bg-gray-200  rounded-md mb-4"
                >

                    {editingTodoId === todo._id ? (
                        <div className="flex-grow w-3/5 mx-auto">
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                            />
                            <textarea
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md resize-none h-40 focus:outline-none focus:ring focus:ring-red-500"
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                                    onClick={cancelEditing}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                    onClick={saveEditing}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <input
                                type="radio"
                                className="mr-4"
                                onChange={() => handleStatusChange(todo?._id)}
                            />
                            <div className="flex-grow">
                                <h4 className="font-semibold">{todo.title}</h4>
                                <p className="text-gray-600">{todo.description}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-600"
                                    onClick={() => startEditing(todo)}
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => handleDelete(todo._id)}
                                >
                                    <FiTrash />
                                </button>
                            </div>
                        </>


                    )}
                </div>
            ))}
            
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                        onClick={handlePreviousPage}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 mr-2 ${
                                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            } rounded-md hover:bg-blue-600 focus:outline-none`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    {currentPage !== totalPages && (
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                            onClick={handleNextPage}
                        >
                            Next
                        </button>
                    )}
                </div>
            
        </div >
    );
};

export default TodoItems;

import React, { useEffect, useState } from 'react';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../../api/endpoints';
import TodoItems from './TodoItems';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddTodo = () => {
    const [addingTodo, setAddingTodo] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const today = new Date();
    const formattedDate = today.toDateString();


    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTodos().then((data) => {
            setTodos(data?.data?.docs)
        })
    }, []);

    const handleAddTodoToggle = () => {
        setAddingTodo(!addingTodo);
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Validation
        if (!title.trim()) {
          toast.error('Title is required.');
          return;
        } else if (title.trim().length < 1) {
          toast.error('Title must contain at least 1 non-whitespace character.');
          return;
        } 
      
        if (description.trim().length < 3) {
          toast.error('Description must contain at least 3 characters.');
          return;
        }
      
        const credentials = {
          title,
          description,
          date: formattedDate,
        };
      
        createTodo(credentials)
          .then((result) => {
            console.log(result);
            resetForm();
      
            getTodos().then((data) => {
              setTodos(data?.data?.docs);
              console.log(data);
              setAddingTodo(false);
              toast.success('Todo added successfully!');
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error('Failed to add todo. Please try again.');
          });
      };
      
      const handleEdit = (id, editedTitle, editedDescription) => {
        // Validation
        if (!editedTitle.trim()) {
          toast.error('Title is required.');
          return;
        } else if (editedTitle.trim().length < 1) {
          toast.error('Title must contain at least 1 non-whitespace character.');
          return;
        }
      
        if (editedDescription.trim().length < 3) {
          toast.error('Description must contain at least 3 characters.');
          return;
        }
      
        updateTodo({ id: id, title: editedTitle, description: editedDescription })
          .then((result) => {
            console.log(result);
            const updatedTodos = todos?.map((todo) => {
              if (todo._id === id) {
                return { ...todo, title: editedTitle, description: editedDescription };
              }
              return todo;
            });
      
            console.log(updatedTodos);
            setTodos(updatedTodos);
            toast.success('Todo updated successfully!');
          })
          .catch((err) => {
            toast.error('Failed to update todo. Please try again.');
            console.log(err);
          });
      };

    const handleDelete = (id) => {
        console.log(id)
        deleteTodo(id)
            .then((result) => {
                console.log(result)
                const updatedTodos = todos.filter((todo) => todo._id !== id);
                setTodos(updatedTodos);
                toast.success('Todo deleted successfully!');
            })
            .catch((err) => {
                toast.error('Failed to delete todo. Please try again.');
                console.log(err);
            });
    };

    return (
        <>
            <div className="flex flex-col w-full bg-stone-600 h-screen">
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                <div className="py-4 px-6 text-white">
                    <h3 className="text-lg font-semibold">Todos</h3>
                </div>
                <div className="flex-grow p-6">
                    {!addingTodo && (
                        <button
                            className="p-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md mb-4"
                            onClick={handleAddTodoToggle}
                        >
                            + New Task
                        </button>
                    )}
                    {addingTodo && (
                        <div className="w-3/5 mx-auto">
                            <form onSubmit={submitHandler}>
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                                <textarea
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md resize-none h-40 focus:outline-none focus:ring focus:ring-blue-500"
                                ></textarea>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                                        onClick={handleAddTodoToggle}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                                    >
                                        Add Todo
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Todo List */}
                    <TodoItems todos={todos} setTodos={setTodos} handleEdit={handleEdit} handleDelete={handleDelete} />

                </div>
            </div>
        </>
    );
};

export default AddTodo;

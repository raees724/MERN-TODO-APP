import React from 'react'

const EditTodo = () => {
    return (
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
    )
}

export default EditTodo
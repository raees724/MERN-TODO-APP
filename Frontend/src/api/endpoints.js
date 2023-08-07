import axios from './axiosInstance';

export function getTodos(page,limit) {
    return new Promise((resolve, reject) => {
        axios.get('/todo/todos', {params: {
            page: page,
            limit: limit,
        },}).then((todos) => {
            resolve(todos)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function createTodo(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/todo/create-todos', credentials).then((todo) => {
            resolve(todo)
        }).catch((err) => {
            reject(err)
        })
    })
}


export function updateTodo(credentials) {
    return new Promise((resolve, reject) => {
        axios.put('/todo/edit', credentials).then((todo) => {
            resolve(todo)
        }).catch((err) => {
            reject(err);
        })
    })
}

export function deleteTodo(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`/todo/delete/${id}`).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function completedTasks() {
    return new Promise((resolve, reject) => {
        axios.get('/todo/completed').then((data) => {
            resolve(data?.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function incompletedTasks() {
    return new Promise((resolve, reject) => {
        axios.get('/todo/incompleted').then((data) => {
            resolve(data?.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function logoutUser() {
    return new Promise((resolve, reject) => {
        axios.get('/auth/signout').then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}


// export function searchTodo(credentials) {
//     return new Promise((resolve, reject) => {
//         axios.get('/todo/getItem', credentials).then((data) => {
//             resolve(data)
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }


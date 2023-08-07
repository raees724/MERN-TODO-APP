import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage';
import { SignUp } from './components/Signup/Signup';
import { SignIn } from './components/signin/Signin';
import CompletedTask from './components/completedTask/CompletedTask';
import SharedLayout from './components/todoList/SharedLayout';
import AddTodo from './components/todoList/AddTodo';
import InclompletedTask from './components/IncompletedTask/InclompletedTask';
import ProtectedRoute from './utils/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { addAccessTokenToken, setLoading } from './redux/appSlice';
import authApi from './api/axiosInstance';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: '/signin',
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: '/',
    element: <ProtectedRoute><SharedLayout><AddTodo /></SharedLayout></ProtectedRoute>,
    errorElement: <ErrorPage />
  },
  {
    path: '/completed',
    element: <ProtectedRoute><SharedLayout><CompletedTask /></SharedLayout></ProtectedRoute>,
    errorElement: <ErrorPage />
  },
  {
    path: '/incompleted',
    element: <ProtectedRoute><SharedLayout><InclompletedTask /></SharedLayout></ProtectedRoute>,
    errorElement: <ErrorPage />
  }



])

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.app.accessToken)

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true))
      try {
        const {
          data: { accessToken },
        } = await authApi.get("auth/refresh");
        dispatch(addAccessTokenToken(accessToken));
      } catch (error) {
        // 
      } finally {
        dispatch(setLoading(false))
      }
    })();
  }, [token]);

  return <RouterProvider router={router} />
}

export default App

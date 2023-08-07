import React, { useState } from "react";
import authApi from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!name) {
      setNameError("Please enter your Full Name");
      isValid = false;
    }else if(name.length < 3){
        setNameError("username atleast contain three characters")
        isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Please enter your Email address");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid Email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your Password");
      isValid = false;
    }else if(password.length < 6){
        setPasswordError("passowrd atleast contain six characters")
        isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSignup = async () => {
    const isValid = validateInputs();

    if (isValid) {
      try {
        const  data  = await authApi.post("auth/signup", {
          username: name,
          email,
          password,
        });
        console.log(data);
        toast.success('signup successful!');
        navigate("/signin");
      } catch (error) {
        toast.error('Invalid credentials. Please check your credentials');
        console.error(error);
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img
              src="https://static.thenounproject.com/png/1530441-200.png"
              alt="todo image"
              className="h-16"
            />
          </div>

          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {nameError && <p className="text-red-500">{nameError}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleSignup}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?
            <Link
              to="/signin"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

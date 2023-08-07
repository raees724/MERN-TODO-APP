// SharedLayout.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/appSlice";
import { logoutUser} from "../../api/endpoints";

const SharedLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const accessToken = useSelector((state) => state?.app?.accessToken);
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSidebarDisable = () => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(false);
    }
  };

  const logoutHandler = () => {
    logoutUser().then((data) => {
      dispatch(logout())
      console.log(data?.data)
    })
  }


  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold text-white">Todo App</div>
        
        <div className="flex items-center">
          {sidebarOpen ? (
            <button
              className="p-2 ml-2 bg-zinc-600 rounded-md focus:outline-none"
              onClick={handleSidebarClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button
              className="p-2 ml-2 bg-zinc-600 rounded-md focus:outline-none"
              onClick={handleSidebarToggle}
              onBlur={handleSidebarDisable}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {
            accessToken ? <button className="p-2 ml-2 bg-red-500 text-white rounded-md focus:outline-none" onClick={logoutHandler}>
              Logout
            </button>
              :
              <div>
                <Link to='/signin' className="p-2 ml-2 bg-gray-300 rounded-md focus:outline-none">
                  Signin
                </Link>
              </div>
          }

        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-1/4 bg-zinc-700 `}>
          <div className="py-4 px-10">
            <ul className="space-y-3">
              <li className="text-gray-700 cursor-pointer">
                <Link to="/">
                  <div className="w-full hover:bg-gray-800 pl-2 pr-4 py-2 rounded-lg text-white">
                    Home
                  </div>
                </Link>
              </li>
              <li className="text-gray-700 cursor-pointer">
                <Link to="/completed">
                  <div className="w-full hover:bg-gray-800 pl-2 pr-4 py-2 rounded-lg text-white ">
                    Completed
                  </div>
                </Link>
              </li>
              <li className="text-gray-700 cursor-pointer">
                <Link to="/incompleted">
                  <div className="w-full hover:bg-gray-800 pl-2 pr-4 py-2 rounded-lg text-white">
                    Incompleted
                  </div>
                </Link>
              </li>

            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </div>
  );
};

export default SharedLayout;

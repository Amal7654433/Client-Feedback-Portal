import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <nav className="bg-gray-800">
      {/* max-w-7xl  */}

      <div className="  mx-auto px-2 sm:px-6 lg:px-8">

        <div className="relative flex h-16 items-center justify-between">
          <div className="hidden sm:flex shrink-0 items-center">
            <span className="text-white text-xl font-semibold">Feedback Portal</span>
          </div>
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Nav Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {/* <img className="h-8 w-auto" src="https://tailwindcss.com/img/logos/workflow-mark-indigo-500.svg" alt="Logo" /> */}
            </div>
            <div className="hidden sm:ml-6 sm:block">
              {user && (<div className="flex space-x-4">

                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
              </div>)}

            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:block flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md bg-gray-700 text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Profile Dropdown */}

          <div className="relative ml-3">
            {user ? (
              <>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="size-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>

                    <AlertDialog >
                      <AlertDialogTrigger asChild>
                        <button className="w-full text-left block px-4 py-2 text-sm text-gray-700">
                          Signout
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-800 border-indigo-600 shadow-none">
                        <AlertDialogHeader>
                          <AlertDialogTitle className='text-white'>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription className='text-white'>
                            This action will log you out from the portal.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className='bg-indigo-500 text-white'>Cancel</AlertDialogCancel>
                          <AlertDialogAction className='text-white bg-red-400'
                            onClick={() => {
                              dispatch(logout());
                              navigate("/login");
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}

              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className=" px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                SIGN IN
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Dashboard</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
          </div>
        </div>
      )}
    </nav>
  );
}

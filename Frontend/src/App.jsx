import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, setUser } from "./redux/slices/authSlice";
import { verifyAuth } from "./services/userService";
import { Loader } from "lucide-react";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, authChecked } = useSelector((state) => state.auth);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await verifyAuth();
        dispatch(setUser(user));
      } catch (error) {
        dispatch(logout());
       
      }
    };
    checkAuth();
  }, [dispatch, navigate]);
  if (!authChecked) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  }
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={!user ? < Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? < Signup /> : <Navigate to="/" />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </>


  )
}

export default App

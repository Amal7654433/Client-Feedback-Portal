import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutUser, setUser } from "./redux/slices/authSlice";
import { verifyAuth } from "./services/userService";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const user = await verifyAuth();
  //       dispatch(setUser(user));
  //     } catch (error) {
  //       dispatch(logoutUser());
  //       navigate("/login");
  //     }
  //   };
  //   checkAuth();
  // }, [dispatch, navigate]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </>


  )
}

export default App

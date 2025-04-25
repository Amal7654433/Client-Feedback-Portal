import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {


  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
     
      </Routes>
    </>
     
   
  )
}

export default App

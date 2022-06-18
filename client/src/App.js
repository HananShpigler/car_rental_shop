import { BrowserRouter, Route, Routes } from "react-router-dom";

import BookingCar from "./pages/BookingCar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";
import "antd/dist/antd.min.css";

function App() {
  const user = localStorage.getItem("user");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:carid" element={<BookingCar user={user} />} />
          <Route path="/userbookings" element={<UserBookings user={user} />} />
          <Route path="/addcar" element={<AddCar user={user} />} />
          <Route path="/editcar/:carid" element={<EditCar user={user} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

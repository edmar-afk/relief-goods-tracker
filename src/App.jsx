import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import Distributions from "./routes/Distributions";
import GoodsDetails from "./components/distributions/GoodsDetails";
import Goods from "./routes/Goods";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin-dashboard" element={<Home />} />
        <Route path="/distributions" element={<Distributions />} />
        <Route path="/distributions/:goodsId" element={<Goods />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

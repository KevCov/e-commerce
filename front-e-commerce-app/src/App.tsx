import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Store from "./pages/Store";
import Basket from "./pages/Basket";
import ScrollUp from "./components/common/ScrollUp";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Details from "./pages/Details";

function App() {
  const isAuthenticated = useAuth().isAuthenticated;

  return (
    <>
      <ScrollUp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/store" element={<Store />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/details/:id" element={<Details />} />
        <Route element={<ProtectedRoute canActivate={isAuthenticated} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

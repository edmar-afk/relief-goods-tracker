import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api";
import CircularProgress from "@mui/material/CircularProgress";
import welcomeImg from "../assets/images/welcome.png";
function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/login/", {
        username: phone,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("userData", JSON.stringify(response.data));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      if (response.data.is_superuser) navigate("/admin-dashboard");
      else navigate("/profile");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid phone number or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="lg:min-h-screen flex fle-col items-center justify-center p-6">
      <div class="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
        <div>
          <img src={welcomeImg} className="w-72" alt="" />
          <h1 class="lg:text-5xl text-4xl font-bold text-slate-900 !leading-tight">
            Welcome to Bayog Relief Goods Tracking System
          </h1>

          <p class="text-[15px] mt-6 text-slate-600 leading-relaxed">
            Access relief goods updates and distribution schedules. Log in with
            your registered phone number to continue.
          </p>

          <p class="text-[14px] mt-4 text-slate-500">
            Don't have an account?
            <Link
              to={"/register"}
              class="text-orange-600 font-medium hover:underline"
            >
              <span className="ml-1 font-bold underline">Register here</span>
            </Link>
          </p>
        </div>

        <form class="max-w-md lg:ml-auto w-full">
          <h2 class="text-slate-900 text-3xl font-semibold mb-8">Log in</h2>

          <div class="space-y-6">
            <div>
              <label class="text-sm text-slate-900 font-medium mb-2 block">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                class="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-orange-600 focus:bg-transparent"
                placeholder="Enter Phone Number"
              />
            </div>

            <div>
              <label class="text-sm text-slate-900 font-medium mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-orange-600 focus:bg-transparent"
                placeholder="Enter Password"
              />
            </div>
          </div>

          <div class="!mt-12">
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              class={`w-full shadow-xl py-2.5 px-4 text-[15px] font-medium rounded-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {loading ? (
                <div class="flex items-center justify-center gap-3">
                  <CircularProgress size={20} />
                  Logging in... Please wait
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

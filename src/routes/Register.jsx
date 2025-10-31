import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api";
import welcomeImg from "../assets/images/welcome.png";
function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [purok, setPurok] = useState("1");
  const [address, setAddress] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isMobileValid = /^09\d{9}$/.test(phone);
  const isPasswordMatch = password !== "" && password === repeatPassword;

  const handleRegister = async () => {
    if (!isMobileValid || !isPasswordMatch) return;
    setLoading(true);
    try {
      await api.post("/api/register/", {
        username: phone,
        first_name: fullName,
        last_name: familyMembers,
        password,
        profile: {
          purok,
          address,
          family_members: familyMembers,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.detail || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="lg:min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div class="grid lg:grid-cols-2 items-center gap-10 max-w-6xl w-full max-lg:max-w-lg">
        <div>
          <img src={welcomeImg} className="w-72" alt="" />
          <h1 class="lg:text-5xl text-4xl font-bold text-slate-900 !leading-tight">
            Welcome to Lakewood Relief Goods Tracking System
          </h1>

          <p class="text-[15px] mt-6 text-slate-600 leading-relaxed">
            Access relief goods updates and distribution schedules. Log in with
            your registered phone number to continue.
          </p>

          <p class="text-[14px] mt-4 text-slate-500">
            Already have an account?
            <Link to={"/"} class="text-orange-600 font-medium hover:underline">
              <span class="ml-1 font-bold underline">Login here</span>
            </Link>
          </p>
        </div>

        <div class="bg-white p-8 shadow-xl rounded-lg w-full max-w-md lg:ml-auto">
          <h2 class="text-3xl font-semibold mb-8 text-slate-900">Register</h2>

          <div class="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              class="w-full px-4 py-3 bg-slate-100 border border-gray-200 rounded-md text-sm focus:border-orange-600"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <div>
              <input
                type="text"
                placeholder="09XXXXXXXXX"
                class={`w-full px-4 py-3 bg-slate-100 border rounded-md text-sm ${
                  phone === "" || isMobileValid
                    ? "border-gray-200"
                    : "border-red-500"
                }`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={11}
              />
              {phone !== "" && !isMobileValid && (
                <p class="text-red-500 text-xs mt-1">
                  Must start with 09 and be 11 digits
                </p>
              )}
            </div>

            <select
              class="w-full px-4 py-3 bg-slate-100 border border-gray-200 rounded-md text-sm focus:border-orange-600"
              value={purok}
              onChange={(e) => setPurok(e.target.value)}
            >
              <option value="1">Purok 1</option>
              <option value="2">Purok 2</option>
              <option value="3">Purok 3</option>
              <option value="4">Purok 4</option>
              <option value="5">Purok 5</option>
            </select>

            <input
              type="text"
              placeholder="Address"
              class="w-full px-4 py-3 bg-slate-100 border border-gray-200 rounded-md text-sm focus:border-orange-600"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="number"
              placeholder="Family Members"
              class="w-full px-4 py-3 bg-slate-100 border border-gray-200 rounded-md text-sm focus:border-orange-600"
              value={familyMembers}
              onChange={(e) => setFamilyMembers(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 bg-slate-100 border border-gray-200 rounded-md text-sm focus:border-orange-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <input
                type="password"
                placeholder="Repeat Password"
                class="w-full px-4 py-3 bg-slate-100 border border-gray-200 rounded-md text-sm focus:border-orange-600"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              {repeatPassword !== "" && !isPasswordMatch && (
                <p class="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={!isMobileValid || !isPasswordMatch || loading}
            class={`mt-8 w-full py-3 rounded-md text-white text-[15px] font-medium ${
              isMobileValid && isPasswordMatch && !loading
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-gray-400"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

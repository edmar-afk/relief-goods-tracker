import React, { useEffect, useState } from "react";
import api from "../assets/api";
import logo from "../assets/images/logo.jpg";
import { Download } from "@mui/icons-material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      api.get(`/api/profile/${data.id}/`).then((res) => {
        setUser(res.data);
        // console.log("Profile Data:", res.data);
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src={user?.profile?.profile_picture || logo}
              alt="Profile Picture"
              draggable="false"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-orange-800 transition-transform duration-300 hover:scale-105"
            />

            <h1 className="text-2xl font-bold text-orange-800 mb-2">
              {user?.first_name} {user?.last_name}
            </h1>

            <p className="text-gray-600 mb-8">
              <LocalPhoneIcon className="mr-1 text-gray-500" />{" "}
              {user?.username}
            </p>

            <Link to={'/logout'} className="mt- bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors duration-300">
             <ExitToAppIcon/> Logout
            </Link>
          </div>

          <div className="md:w-2/3 md:pl-8">
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-orange-800 mb-2">
                  Address
                </h2>
                <div className="flex flex-row">
                  <ContactMailIcon className="mr-2 text-gray-500" />{" "}
                  <p className="text-gray-700">{user?.profile?.address || "-"}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-orange-800 mb-2">
                  Purok
                </h2>
                <div className="flex flex-row">
                  <AccountBalanceIcon className="mr-2 text-gray-500" />{" "}
                  <p className="text-gray-700">Purok {user?.profile?.purok || "-"}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-orange-800 mb-2">
                  Family Members
                </h2>
                <div className="flex flex-row">
                  <GroupIcon className="mr-2 text-gray-500" />{" "}
                  <p className="text-gray-700">
                    {user?.profile?.family_members || "-"} Members
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-orange-800 mb-2">
                QR Code
              </h2>

              {user?.qr_code ? (
                <div className="flex flex-col items-start gap-3">
                  <img
                    src={user.qr_code}
                    className="w-40 rounded-lg border-2 border-orange-800"
                    draggable="false"
                  />

                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = user.qr_code;
                      link.download = "qr-code.png";
                      link.click();
                    }}
                    className="flex items-center gap-2 bg-orange-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition"
                  >
                    Download QR
                    <Download />
                  </button>
                </div>
              ) : (
                <p className="text-gray-600 font-medium">
                  Wait for officials to give you QR Code
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

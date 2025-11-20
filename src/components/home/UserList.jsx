import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import logo from "../../assets/images/logo.jpg";
import api from "../../assets/api";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Swal from "sweetalert2";

function UserList() {
  const [residents, setResidents] = useState([]);
  const [qrStatus, setQrStatus] = useState({});

  useEffect(() => {
    api.get("/api/residents/").then((res) => {
      setResidents(res.data);
      res.data.forEach((user) => {
        api
          .get(`/api/check-qr/${user.id}/`)
          .then((r) =>
            setQrStatus((prev) => ({ ...prev, [user.id]: r.data.has_qr }))
          );
      });
    });
  }, []);

  const handleGenerateQr = (id) => {
    api.post(`/api/generate-qr/${id}/`).then(() => {
      setQrStatus((prev) => ({ ...prev, [id]: true }));
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: `You want to remove ${user.first_name}?`,
      text: "Deleting can't be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/api/users/delete/${user.id}/`).then(() => {
          setResidents(residents.filter((u) => u.id !== user.id));
          Swal.fire(
            "Deleted!",
            `${user.first_name} has been removed.`,
            "success"
          );
        });
      }
    });
  };

  console.log(residents)

  return (
    <div class="p-4">
      <div className="flex flex-row justify-between mb-5">
        <p>Registered Residents</p>
      </div>

      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {residents.map((user) => (
          <div key={user.id} class="flex justify-center">
            <div class="w-[300px] lg:w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm h-[400px] overflow-y-auto custom-scrollbar">
              <div class="flex flex-col items-center pb-10 -mt-5">
                <img
                  class="w-24 h-24 mb-3 rounded-full shadow-lg mt-12 object-cover"
                  src={user.profile?.profile_picture || 'https://static.vecteezy.com/system/resources/previews/046/010/545/non_2x/user-icon-simple-design-free-vector.jpg'}
                  draggable="false"
                  alt="profile"
                />

                <div class="grid grid-cols-2 gap-x-1 text-center w-full px-4">
                  <h5 class="mb-1 text-xl font-medium text-gray-900 col-span-2">
                    {user.first_name} {user.last_name}
                  </h5>
                  <span class="text-sm text-gray-500 col-span-2 mb-4">
                    {user.username}
                  </span>

                  <p class="text-xs text-gray-500">Address:</p>
                  <p class="text-xs text-gray-500">
                    {user.profile?.address || "-"}
                  </p>

                  <p class="text-xs text-gray-500">Purok:</p>
                  <p class="text-xs text-gray-500">
                    {user.profile?.purok || "-"}
                  </p>

                  <p class="text-xs text-gray-500">Family:</p>
                  <p class="text-xs text-gray-500">
                    {user.profile?.family_members || "-"} Members
                  </p>
                </div>

                <div class="flex flex-col w-full px-4 gap-2 mt-4 md:mt-6">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    class="py-2 px-4 cursor-pointer ms-2 text-sm font-medium text-white bg-red-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-100 duration-300"
                  >
                    <DeleteIcon fontSize="small" className="-mt-0.5" /> Remove
                  </button>

                  {qrStatus[user.id] ? (
                    <button
                      disabled
                      class="py-2 px-4 ms-2 text-sm font-medium bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
                    >
                      QR Code Generated
                    </button>
                  ) : (
                    <button
                      onClick={() => handleGenerateQr(user.id)}
                      class="py-2 px-4 cursor-pointer ms-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-red-100 duration-300"
                    >
                      <QrCodeIcon fontSize="small" className="-mt-0.5" />{" "}
                      Generate QR Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;

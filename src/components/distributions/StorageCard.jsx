/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import React from "react";
import api from "../../assets/api";

function StorageCard({ title, subtitle, date, goodsId, is_homepage, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Manila",
    };
    return d
      .toLocaleString("en-US", options)
      .replace("AM", "am")
      .replace("PM", "pm")
      .replace(",", ".");
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete Relief Goods?")) return;
    try {
      await api.delete(`/api/relief-goods/${goodsId}/delete/`);
      onDelete && onDelete(goodsId);
    } catch (e) {
      onDelete && onDelete(goodsId);
    }
  };

  return (
    <div
      onClick={() => navigate(`./${goodsId}`)}
      className="flex cursor-pointer flex-row items-center p-4 bg-white rounded-lg mb-2 shadow-sm"
    >
      <div className="bg-orange-500 p-2 rounded-lg">
        <Inventory2OutlinedIcon style={{ fontSize: 24, color: "white" }} />
      </div>

      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-bold text-gray-700">{title}</p>
          <p className="text-xs text-gray-700">{formatDate(date)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs font-light text-gray-700">{subtitle} Residents</p>
          {!is_homepage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-xs font-bold text-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StorageCard;

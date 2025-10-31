import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import api from "../../assets/api";

function AddReliefGoods({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddReliefGoods = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/api/relief-goods/", { name });
      if (onAdd) onAdd(res.data);
      setName("");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="flex items-center text-xs text-blue-600">
        <AddCircleOutlineIcon fontSize="small" className="mr-1" /> Add Relief Goods
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-4">Add Relief Good</h2>

            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full mb-4"
              placeholder="Enter relief good name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={handleAddReliefGoods}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddReliefGoods;

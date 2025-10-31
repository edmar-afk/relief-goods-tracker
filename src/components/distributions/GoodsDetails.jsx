/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../../assets/api";
import logo from "../../assets/images/logo.jpg";

function GoodsDetails() {
  const { goodsId } = useParams();
  const [goods, setGoods] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scannedData, setScannedData] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [scanning, setScanning] = useState(true); // ✅ add this

  const formatDate = (iso) => {
    const d = new Date(iso);
    const o = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Manila",
    };
    return d
      .toLocaleString("en-US", o)
      .replace("AM", "am")
      .replace("PM", "pm")
      .replace(",", ".");
  };

  const fetchGoods = async () => {
    try {
      const r = await api.get(`/api/relief-goods/${goodsId}/`);
      setGoods(r.data);
    } catch (err) {
      console.error("Error fetching goods:", err);
    } finally {
      setLoading(false);
    }
  };

  const claimReliefGoods = async (userId) => {
    if (!goodsId || claiming) return;
    try {
      setClaiming(true);
      await api.post(`/api/reliefgoods/${goodsId}/claim/`, { user_id: userId });
      await fetchGoods();
      alert("✅ Success: Relief goods successfully claimed!");
    } catch (error) {
      alert(
        "⚠️ This resident already claimed the relief goods or error occurred."
      );
    } finally {
      setClaiming(false);
      setScanning(true);
    }
  };

  const handleScan = (data) => {
    if (!data || !scanning) return;
    setScanning(false);
    setScannedData(data);

    let userId = null;

    const match = data.match(/User ID:\s*(\d+)/);
    if (match) userId = match[1];
    if (!match && /^\d+$/.test(data)) userId = data;

    if (userId) {
      claimReliefGoods(userId);
    } else {
      alert("⚠️ Invalid QR/Barcode: Could not extract user ID.");
      setScanning(true);
    }
  };

  const handleError = (err) => {
    console.error("Barcode scan error:", err);
    // optionally allow retry
  };

  useEffect(() => {
    if (goodsId) fetchGoods();
  }, [goodsId]);

  if (loading)
    return <div className="flex justify-center p-10">Loading...</div>;
  if (!goods)
    return <div className="flex justify-center p-10">No goods found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800">{goods.name} Relief Goods</h1>

      <div className="mt-6 flex justify-center items-center w-fit lg:w-96 rounded-lg overflow-hidden shadow-2xl mx-auto">
        {scanning && (
          <div className="">
            <Scanner
              onScan={(detectedCodes) => {
                if (!detectedCodes || detectedCodes.length === 0) return;
                const value = detectedCodes[0]?.rawValue;
                if (value) handleScan(value);
              }}
              onError={(error) => console.error(error)}
              components={{
                finder: true,
              }}
              styles={{
                container: { width: "100%", height: "100%" },
                video: { width: "100%", height: "100%", objectFit: "cover" },
              }}
            />
          </div>
        )}
      </div>
      {/* {scannedData && (
        <p className="text-center mt-2 text-green-700 font-bold">
          Scanned: {scannedData}
        </p>
      )} */}

      <div className="flex justify-between mt-4 text-gray-600">
        <p className="text-xs">
          Claimed by:{" "}
          <span className="font-bold">{goods.claimed_by.length}</span> residents
        </p>
        <p className="text-xs">Issued: {formatDate(goods.date_issued)}</p>
      </div>

      <div className="mt-6">
        {goods.claimed_by.length === 0 && (
          <p className="text-gray-500 text-center mt-24">No residents yet</p>
        )}
        {goods.claimed_by.map((item) => (
          <div
            key={item.id}
            className="mb-3 flex items-center bg-white shadow p-4"
          >
            <img
              src={item.profile?.profile_picture || logo}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-bold text-gray-800">{item.first_name}</p>
              <p className="text-xs text-gray-600">
                Purok: {item.profile?.purok}
              </p>
              <p className="text-xs text-gray-600">
                Address: {item.profile?.address}
              </p>
              <p className="text-xs text-gray-600">
                Family Members: {item.profile?.family_members}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoodsDetails;

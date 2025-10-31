import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import AddReliefGoods from "./AddReliefGoods";
import StorageCard from "./StorageCard";

function DistributionLists() {
  const [reliefGoods, setReliefGoods] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReliefGoods = async () => {
      try {
        const response = await api.get("/api/relief-goods/");
        setReliefGoods(response.data);
      } catch (error) {
        console.error("Error fetching relief goods:", error);
      }
    };

    fetchReliefGoods();
  }, []);

  const filteredGoods = reliefGoods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-gray-700">
            Relief Goods Lists
          </h2>

          <AddReliefGoods
            onAdd={(newGood) => setReliefGoods([newGood, ...reliefGoods])}
          />
        </div>

        <input
          placeholder="Search Name..."
          className="text-sm focus:outline-none px-2 py-2 w-[300px]  border border-gray-300 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-4 px-4 pb-10">
        {filteredGoods.length > 0 ? (
          filteredGoods.map((item) => (
            <StorageCard
              key={item.id}
              goodsId={item.id}
              title={item.name}
              subtitle={`Claimed by: ${item.claimed_by.length}`}
              date={item.date_issued}
              is_homepage={false}
              onDelete={(deletedId) =>
                setReliefGoods((prev) => prev.filter((g) => g.id !== deletedId))
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No relief goods found
          </p>
        )}
      </div>
    </div>
  );
}

export default DistributionLists;

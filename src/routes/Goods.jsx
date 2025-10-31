import React from "react";
import Sidebar from "../components/Sidebar";
import GoodsDetails from "../components/distributions/GoodsDetails";

function Goods() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-72 mt-12 lg:mt-20 overflow-hidden">
        <div className="p-0 lg:p-6">
          <GoodsDetails />
        </div>
      </main>
    </>
  );
}

export default Goods;

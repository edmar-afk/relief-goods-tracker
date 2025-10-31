import React from "react";
import Sidebar from "../components/Sidebar";
import DistributionLists from "../components/distributions/DistributionLists";

function Distributions() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-72 mt-12 lg:mt-20">
        {/* <p className="font-bold text-2xl px-8">Welcome To Dashboard, Admin.</p> */}
        <div className="p-0 lg:p-6">
          <DistributionLists />
        </div>
      </main>
    </>
  );
}

export default Distributions;

import React from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/home/UserList";

function Home() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-72 mt-12 lg:mt-20">
        <p className="font-bold text-2xl px-8">Welcome To Dashboard, Admin.</p>
        <div className="p-0 lg:p-6">
          <UserList />
        </div>
      </main>
    </>
  );
}

export default Home;

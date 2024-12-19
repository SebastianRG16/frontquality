import React from "react";
import { Outlet } from "react-router-dom";

export function Index() {
  return (
    <div className="flex-col h-screen justify-center items-center">
      <div className="flex-col bg-zinc-950 justify-center items-center">
        <div className="flex-col bg-zinc-950 justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-zinc-950 h-max min-h-[100vh] pb-0">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

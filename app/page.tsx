"use client";

import React, { FC } from "react";
import Navbar from "./components/Navbar";
import BoxPython from "./components/BoxPython";

import { boxCode } from "./config/boxCode";

const App: FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="container mx-auto max-w-6xl space-y-8">
            {boxCode.map((box: any, index: number) => (
              <div
                key={index}
                className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              >
                <div className="bg-gray-900/90 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-indigo-300 mb-2">
                    {box.section}
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">{box.explaind}</p>
                  <BoxPython
                    section={box.section}
                    explaind={box.explaind}
                    initialCode={box.initialCode}
                    initialOutput={box.initialOutput}
                    language={box.language}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
            <p>
              © 2025{" "}
              <span className="text-indigo-400 font-medium">Python Sandbox UI</span>. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;

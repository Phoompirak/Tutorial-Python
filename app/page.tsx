"use client";

import React, { FC } from 'react';
import BoxPython from './components/BoxPython';

const boxCode: any = [
  {
    section: 'Hello World',
    explaind: 'Show Text Output Hello World',
    initialCode: 'print("Hello, Python!")\n\nN=6\n\nfor a in range(1, N+1):\n    for b in range(N):\n        print("*", end=" ")\n    print()',
    initialOutput: 'Hello, Python!\n\n*\n**\n***\n****\n*****\n******\n\n',
  },
  {
    section: 'Hello World',
    explaind: 'Show Text Output Hello World',
    initialCode: 'print("Hello, Python!")\n\nN=6\n\nfor a in range(1, N+1):\n    for b in range(N):\n        print("*", end=" ")\n    print()',
    initialOutput: 'Hello, Python!\n\n*\n**\n***\n****\n*****\n******\n\n',
  },
  {
    section: 'Hello World',
    explaind: 'Show Text Output Hello World',
    initialCode: 'print("Hello, Python!")\n\nN=6\n\nfor a in range(1, N+1):\n    for b in range(N):\n        print("*", end=" ")\n    print()',
    initialOutput: 'Hello, Python!\n\n*\n**\n***\n****\n*****\n******\n\n',
  }
]

// เนื่องจากเราใช้แค่ Dark Theme จึงไม่จำเป็นต้องใช้ state หรือ useEffect เพื่อจัดการ theme อีกต่อไป
const App: FC = () => {

  return (
    // Main Container: Hardcoded to dark mode background (bg-gray-900)
    <div className="min-h-screen bg-gray-900 transition-colors duration-300 font-sans p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl">

        {/* Header: Hardcoded to dark mode surface (bg-gray-800) */}
        <header className="flex justify-between items-center mb-6 p-4 bg-gray-800 rounded-xl shadow-lg">
          {/* Header Text: Hardcoded to dark mode accent (text-indigo-400) */}
          <h1 className="text-3xl font-extrabold text-indigo-400">
            Python Live Sandbox (Simulator)
          </h1>
          {/* Theme Toggle Button: REMOVED */}
          <div className="w-8 h-8"></div> {/* Placeholder for alignment if needed, or remove for left alignment */}
        </header>

        {
          boxCode.map((box: any, index: number) => (
            <div key={index}>
              <BoxPython
                section={box.section}
                explaind={box.explaind}
                initialCode={box.initialCode}
                initialOutput={box.initialOutput}
              />
            </div>
          ))
        }

        {/* Footer Text: gray-400 */}
        <footer className="mt-8 text-center text-xs text-gray-400">
          <p>
            *** Disclaimer: This is a client-side user interface demonstration. The execution is simulated by a simple JavaScript parser
            that only detects the content of 'print()' statements. It does not run actual Python code. ***
          </p>
        </footer>

      </div>
    </div>
  );
};

export default App;

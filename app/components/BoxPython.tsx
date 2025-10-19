"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface BoxPythonProps {
    section: string;
    explaind: string;
    initialCode: string;
    initialOutput: string;
}

export default function BoxPython({ section, explaind, initialCode, initialOutput }: BoxPythonProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState(initialOutput);

    const runCode = async () => {
        try {
            const res = await fetch("/api/run-python", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || `Status ${res.status}`);
            }

            const data = await res.json();
            if (data.stderr) {
                setOutput(data.stderr);
                return;
            }
            setOutput(data.output);
        } catch (err: any) {
            setOutput("Error: " + err.message);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();

            // 1. Assert e.target to be HTMLTextAreaElement
            const target = e.target as HTMLTextAreaElement;

            // 2. Use the correctly typed target
            const cursorPos = target.selectionStart;

            const newCode =
                code.substring(0, cursorPos) +
                "    " + // เพิ่ม 4 ช่องว่างแทน Tab
                code.substring(cursorPos);

            setCode(newCode);

            setTimeout(() => {
                // 3. Use the correctly typed target again
                target.selectionStart = target.selectionEnd = cursorPos + 4;
            }, 0);
        }
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <h1 className="text-white font-bold text-4xl">Section: {section}</h1>
            <h3 className="text-white font-bold text-2xl">explaind: {explaind}</h3>
            {/* Box 1: Code Editor */}
            <div className="flex flex-col bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-700/50">
                    <h2 className="text-lg font-semibold text-gray-200">
                        <span className="text-indigo-500 font-bold mr-1">&gt;</span> CODE EDITOR (Python)
                    </h2>
                    <button
                        onClick={runCode}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 transform hover:scale-[1.02]"
                    >
                        <Play size={18} />
                        <span>Run Code</span>
                    </button>
                </div>
                <div className="flex-grow p-0">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        className="w-full h-96 lg:h-[600px] p-4 text-sm font-mono bg-gray-900 text-green-300 placeholder-gray-500 resize-none outline-none border-none transition-shadow focus:shadow-inner focus:ring-4 focus:ring-indigo-500/30"
                        style={{ lineHeight: "1.5rem", tabSize: 4 }}
                    />
                </div>
            </div>

            {/* Box 2: Output Console */}
            <div className="flex flex-col bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="p-3 border-b border-gray-700 bg-gray-700/50">
                    <h2 className="text-lg font-semibold text-gray-200">
                        <span className="text-yellow-500 font-bold mr-1">&lt;</span> PROGRAM OUTPUT
                    </h2>
                </div>
                <div className="flex-grow">
                    <pre
                        className="w-full h-96 lg:h-[600px] p-4 text-sm font-mono whitespace-pre-wrap overflow-y-auto bg-gray-900 text-gray-300"
                        style={{ lineHeight: "1.5rem" }}
                    >
                        {output}
                    </pre>
                </div>
            </div>
        </div>
    );
}

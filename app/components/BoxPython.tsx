"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import CodeEditor from "./CodeEditor";

interface BoxPythonProps {
    section: string;
    explaind: string;
    initialCode: string;
    initialOutput: string;
    language?: string;
}

const supportedLanguages = [
    "python",
    "javascript",
    "typescript",
    "java",
    "csharp",
    "cpp",
    "c",
    "kotlin",
    "swift",
    "go",
]


export default function BoxPython({ section, explaind, initialCode, initialOutput, language }: BoxPythonProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState(initialOutput);
    const [languageSelected, setLanguageSelected] = useState(language || "python");

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

                    <div className="flex flex-row gap-4">
                        {/* Language Select */}
                        <select
                            value={language}
                            onChange={(e) => setLanguageSelected(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none"
                        >
                            {supportedLanguages.map((lang: string) => (
                                <option key={lang} value={lang}>
                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={runCode}
                            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 transform hover:scale-[1.02]"
                        >
                            <Play size={18} />
                            <span>Run Code</span>
                        </button>
                    </div>
                </div>
                <div className="flex-grow p-0">
                    <CodeEditor
                        initialCode={code}
                        language="python"
                        onChange={(value) => setCode(value || "")}
                    />
                    {/* <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        className="w-full h-96 lg:h-[600px] p-4 text-sm font-mono bg-gray-900 text-green-300 placeholder-gray-500 resize-none outline-none border-none transition-shadow focus:shadow-inner focus:ring-4 focus:ring-indigo-500/30"
                        style={{ lineHeight: "1.5rem", tabSize: 4 }}
                    /> */}
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

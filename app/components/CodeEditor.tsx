"use client"; // Next.js 13+ app directory จำเป็นถ้าใช้ client component

import React, { useRef } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import { registerPythonAutoComplete } from "../config/autoComplete/pythonAutoComplete";

interface CodeEditorProps {
  language?: string;
  theme?: string;
  initialCode?: string;
  height?: string;
  onChange?: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "python",
  theme = "vs-dark",
  initialCode = "print('Hello, World!')",
  height = "500px",
  onChange,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // 🔥 Register auto-complete สำหรับ Python
    if (language === "python") {
      registerPythonAutoComplete(monaco);
    }
  };

  const handleChange: OnChange = (value) => {
    if (onChange) onChange(value);
  };

  

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={initialCode}
        theme={theme}
        onMount={handleEditorDidMount}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;

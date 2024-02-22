"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface IEditorProps {
  value: string;
  onChange: () => void;
  label?: string;
  error?: string;
}
const Editor = ({ value, onChange, label, error }: IEditorProps) => {
  return (
    <div className="relative">
      {label && (
        <span className="text-xs font-medium text-gray-900">{label}</span>
      )}
      <div className="">
        <ReactQuill theme="snow" value={value} onChange={onChange} className="" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Editor;

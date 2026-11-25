"use client";
import React, { useRef } from "react";
import {
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiListUnordered,
  RiListOrdered,
  RiBold,
  RiItalic,
  RiUnderline,
  RiFormatClear,
} from "react-icons/ri";

interface RichTextToolbarEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
}

export default function RichTextToolbarEditor({
  value,
  onChange,
  placeholder = "Write your description here...",
  rows = 4,
  maxLength = 200,
  showCharCount = false,
}: RichTextToolbarEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormatting = (format: string) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    let replacement = selected;
    switch (format) {
      case "bold":
        replacement = `**${selected || "bold text"}**`;
        break;
      case "italic":
        replacement = `*${selected || "italic text"}*`;
        break;
      case "underline":
        replacement = `_${selected || "underlined text"}_`;
        break;
      case "clear":
        replacement = selected.replace(/[*_~`]/g, "");
        break;
      case "bullet":
        replacement = `\n• ${selected || "list item"}`;
        break;
      case "number":
        replacement = `\n1. ${selected || "numbered item"}`;
        break;
      default:
        break;
    }

    const nextValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(nextValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + replacement.length);
    }, 0);
  };

  return (
    <div className="w-full border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-200 focus-within:border-[#5160E7] focus-within:ring-2 focus-within:ring-[#5160E7]/10">
      {/* Editor Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-100 bg-[#FAFAFC]">
        <button
          type="button"
          onClick={() => applyFormatting("align-left")}
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded cursor-pointer transition-colors"
          title="Align Left"
        >
          <RiAlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("align-center")}
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded cursor-pointer transition-colors"
          title="Align Center"
        >
          <RiAlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("align-right")}
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded cursor-pointer transition-colors"
          title="Align Right"
        >
          <RiAlignRight size={16} />
        </button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <button
          type="button"
          onClick={() => applyFormatting("bullet")}
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded cursor-pointer transition-colors"
          title="Bulleted List"
        >
          <RiListUnordered size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("number")}
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded cursor-pointer transition-colors"
          title="Numbered List"
        >
          <RiListOrdered size={16} />
        </button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <button
          type="button"
          onClick={() => applyFormatting("bold")}
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded cursor-pointer transition-colors font-bold text-xs px-2"
          title="Bold"
        >
          <RiBold size={15} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("italic")}
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded cursor-pointer transition-colors font-italic text-xs px-2"
          title="Italic"
        >
          <RiItalic size={15} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("underline")}
          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded cursor-pointer transition-colors text-xs px-2"
          title="Underline"
        >
          <RiUnderline size={15} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("clear")}
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 rounded cursor-pointer transition-colors"
          title="Clear Formatting"
        >
          <RiFormatClear size={15} />
        </button>
      </div>

      {/* Text Area */}
      <div className="relative p-3">
        <textarea
          ref={textareaRef}
          value={value}
          rows={rows}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none border-none outline-none text-sm text-[#101828] placeholder-gray-400 bg-transparent leading-relaxed"
        />

        {showCharCount && (
          <div className="w-full flex justify-end text-xs text-gray-400 mt-1">
            <span>
              {value.length}/{maxLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

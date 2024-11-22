import "../tiptap-tailwind.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlock from "@tiptap/extension-code-block";
import { FaCode } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { FaListUl } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md";
import TextAlign from "@tiptap/extension-text-align";
import {
  GrTextAlignCenter,
  GrTextAlignFull,
  GrTextAlignLeft,
  GrTextAlignRight,
} from "react-icons/gr";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import HightLight from "@tiptap/extension-highlight";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { RxDividerVertical } from "react-icons/rx";

// define your extension array
const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Underline,
  Placeholder.configure({ placeholder: "Description..." }),
  CodeBlock.configure({
    languageClassPrefix: "language-",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  HightLight,
];

const TextEditor = ({ onChangeValue, content = ``, height }) => {
  const [format, setFormat] = useState("Paragraph");
  const setParagraph = () => {
    editor.chain().focus().setParagraph().run();
    setFormat("Paragraph");
  };
  const setHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setFormat("H" + level);
  };
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      onChangeValue(editor.getHTML());
    },
  });
  return (
    <div className="my-10 w-full ">
      <div className="w-full p-2 bg-gray-100">
        <div className="flex gap-1 items-center text-sm lg:text-base flex-wrap ">
          <button
            type="button"
            className={`text-slate-800 font-bold px-2 ${
              editor.isActive("bold")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            B
          </button>
          <button
            type="button"
            className={`text-slate-800 italic px-2  ${
              editor.isActive("italic")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            I
          </button>
          <button
            type="button"
            className={`text-slate-800 underline font-semibold px-2  ${
              editor.isActive("underline")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
          >
            U
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive("strike")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          >
            <s>abc</s>
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive("codeBlock")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          >
            <FaCode className="size-2 lg:size-5" />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive("blockquote")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          >
            <FaQuoteRight className="size-3" />
          </button>
          <Menu as="div" className="relative inline-block text-left z-10">
            <MenuButton className="inline-flex justify-between items-center w-full px-4 py-2 bg-gray-100 rounded-md">
              Format
              <FaAngleDown />
            </MenuButton>
            <MenuItems className="absolute mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
              <div className="px-1 py-1">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={setParagraph}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Paragraph
                    </button>
                  )}
                </MenuItem>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <MenuItem key={level}>
                    {({ active }) => (
                      <button
                        onClick={() => setHeading(level)}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        H{level}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive("bulletList")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
          >
            <FaListUl />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive("orderedList")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          >
            <MdFormatListNumbered className="size-5" />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive({ textAlign: "left" })
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          >
            <GrTextAlignLeft className="size-4" />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive({ textAlign: "center" })
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            disabled={
              !editor.can().chain().focus().setTextAlign("center").run()
            }
          >
            <GrTextAlignCenter className="size-4" />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive({ textAlign: "right" })
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          >
            <GrTextAlignRight className="size-4" />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive({ textAlign: "justify" })
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            disabled={
              !editor.can().chain().focus().setTextAlign("justify").run()
            }
          >
            <GrTextAlignFull className="size-4" />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2  ${
              editor.isActive("highlight")
                ? "border border-gray-400 bg-gray-200"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
          >
            <PiPencilSimpleLineBold className="size-4" />
          </button>
          <div className="mx-4">
            <div className="h-10 w-[1px] bg-gray-300" />
          </div>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2 `}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <LuUndo2 className="size-4" />
          </button>
          <button
            type="button"
            className={`text-slate-800  font-semibold px-2 `}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <LuRedo2 className="size-4" />
          </button>
        </div>
      </div>
      <div
        className={`w-full border ${
          height
            ? `h-full min-h-[${height}] max-h-[${height}]`
            : " min-h-[300px] max-h-[300px]"
        } overflow-y-auto`}
      >
        <EditorContent editor={editor} className="ProseMirror " />
      </div>
    </div>
  );
};
export default TextEditor;

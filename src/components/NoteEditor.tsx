import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input-large input-primary input w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          ></input>
        </h2>
        <CodeMirror
          value={code}
          width="100%"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions m-7 mt-0 justify-end">
        <button
          onClick={() => {
            onSave({ title, content: code });
            setCode("");
            setTitle("");
          }}
          className="primary-btn btn"
          disabled={title.trim().length === 0 || code.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

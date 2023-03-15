import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useEffect, useState } from "react";

import type { RouterOutputs } from "~/utils/api";
type Note = RouterOutputs["note"]["getAll"][0];

export const NoteEditor = ({
  onSave,
  note,
}: {
  onSave: (note: { title: string; content: string }) => void;
  note?: Note | null;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    setTitle(note?.title || "");
    setCode(note?.content || "");
  }, [note]);

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
            if (!title || !code) {
              return;
            }
            onSave({ title, content: code });
            setTitle("");
            setCode("");
          }}
          className="primary-btn btn"
          disabled={title?.trim().length === 0 || code?.length === 0}
        >
          {note ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

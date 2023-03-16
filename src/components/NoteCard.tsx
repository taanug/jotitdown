import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import type { RouterOutputs } from "~/utils/api";
import { NoteEditor } from "./NoteEditor";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
  onUpdate,
}: {
  note: Note;
  onDelete: () => void;
  onUpdate: (title: string, content: string) => void;
}) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="card border border-gray-200 bg-base-100 shadow-xl">
      <div className="m-0 p-3">
        <div>
          <div
            className={`collapse-arrow cursor-pointer ${
              isExpanded || isDeleteAlertOpen ? "collapse-open" : ""
            } collapse`}
            onClick={() => {
              if (isDeleteAlertOpen) {
                return;
              }
              setIsExpanded(!isExpanded);
              setIsEditorOpen(isEditorOpen && false);
            }}
          >
            <div className="collapse-title text-xl font-bold">{note.title}</div>
            <div className="collapse-content">
              {isExpanded && (
                <>
                  <div className="prose lg:prose-xl">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                </>
              )}
            </div>
          </div>
          {isExpanded && isEditorOpen && (
            <div className="mb-10 mt-0">
              <NoteEditor
                topicTitle=""
                note={note}
                onCancel={() => setIsEditorOpen(false)}
                onSave={({ title, content }) => {
                  const data = {
                    title,
                    content,
                  };
                  void onUpdate(title, content);
                  setIsEditorOpen(false);
                }}
              />
            </div>
          )}
          <div className="flex w-full">
            {!isEditorOpen && !isDeleteAlertOpen && isExpanded && (
              <div
                className="btn-primary btn-xs btn m-auto ml-3 mb-3 px-5"
                onClick={(e) => {
                  setIsEditorOpen(true);
                  setIsExpanded(true);
                }}
              >
                Edit
              </div>
            )}
            {!isDeleteAlertOpen && isExpanded && (
              <svg
                onClick={(e) => {
                  setIsDeleteAlertOpen(true);
                  setIsExpanded(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-3 ml-auto h-6 w-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            )}
          </div>
          <div className="ml-3 mr-3">
            {isDeleteAlertOpen && (
              <div className="alert alert-warning shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>
                    Warning! Are you sure you want to Delete this note?
                  </span>
                </div>
                <div className="flex-none">
                  <button
                    className="btn-primary btn-sm btn z-50"
                    onClick={(e) => {
                      setIsDeleteAlertOpen(!isDeleteAlertOpen);
                      setIsExpanded(false);
                    }}
                  >
                    Do Not Delete
                  </button>
                  <button
                    className="btn-ghost btn-sm btn z-50"
                    onClick={(e) => {
                      onDelete();
                      setIsDeleteAlertOpen(!isDeleteAlertOpen);
                      setIsExpanded(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

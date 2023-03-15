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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="m-0 p-3">
        <div>
          <div
            className={`collapse-arrow cursor-pointer ${
              isExpanded || showDeleteAlert ? "collapse-open" : ""
            } collapse`}
            onClick={() => {
              if (showDeleteAlert) {
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
            <div className="m-10 mt-0">
              <NoteEditor
                note={note}
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
          {!showDeleteAlert && isExpanded && (
            <div
              className="btn-warning btn-xs btn ml-3 mb-3 px-5"
              onClick={(e) => {
                setShowDeleteAlert(true);
                setIsExpanded(true);
              }}
            >
              Delete
            </div>
          )}
          {!isEditorOpen && isExpanded && (
            <div
              className="btn-warning btn-xs btn ml-3 mb-3 px-5"
              onClick={(e) => {
                setIsEditorOpen(true);
                setIsExpanded(true);
              }}
            >
              Edit
            </div>
          )}
          <div>
            {showDeleteAlert && (
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
                      setShowDeleteAlert(!showDeleteAlert);
                      setIsExpanded(false);
                    }}
                  >
                    Do Not Delete
                  </button>
                  <button
                    className="btn-ghost btn-sm btn z-50"
                    onClick={(e) => {
                      onDelete();
                      setShowDeleteAlert(!showDeleteAlert);
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

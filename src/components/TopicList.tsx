import type { RouterOutputs } from "~/utils/api";

type Topic = RouterOutputs["topic"]["getAll"][0];

const TopicList = ({
  topics,
  selectedTopic,
  setSelectedTopic,
  onCreateTopic,
  onDeleteTopic,
}: {
  topics: Topic[] | undefined;
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic) => void;
  onCreateTopic: (topic: string) => void;
  onDeleteTopic: (topicId: string) => void;
}) => {
  return (
    <>
      <ul className="menu rounded-box mt-0.5 w-full bg-base-100 p-2 pl-0 pr-0 pb-0">
        {topics?.map((topic) => (
          <li key={topic.id}>
            <a
              className={`${topic.id === selectedTopic?.id ? "active" : ""}`}
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                setSelectedTopic(topic);
              }}
            >
              {topic.title}
              <svg
                onClick={() => {
                  onDeleteTopic(topic.id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${
                  selectedTopic?.id !== topic?.id ? "hidden" : ""
                } ml-auto h-6 w-6 cursor-pointer`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
      {topics && topics[0] && <div className="divider"></div>}
      <input
        type="text"
        placeholder="New Topic"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Tab") {
            onCreateTopic(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </>
  );
};

export default TopicList;

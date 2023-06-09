import { useSession } from "next-auth/react";
import { useState } from "react";
import { NoteCard } from "~/components/NoteCard";
import { NoteEditor } from "~/components/NoteEditor";
import TopicList from "~/components/TopicList";
import { RouterOutputs, api } from "~/utils/api";

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );
  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: (topic) => {
      void refetchTopics();
      void setSelectedTopic(topic);
    },
  });

  const onCreateTopic = (topic: string) => {
    void createTopic.mutate({
      title: topic,
    });
  };

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      setSelectedTopic(null);
      void refetchTopics();
      void refetchNotes();
    },
  });

  const onDeleteTopic = (topicId: string) => {
    void deleteTopic.mutate({ id: topicId });
  };

  const updateNote = api.note.update.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <div className="mx-5 mt-5 grid gap-2 sm:grid-rows-2 lg:grid-cols-4">
      <div className="colspan-1 px-2">
        <TopicList
          topics={topics}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          onCreateTopic={onCreateTopic}
          onDeleteTopic={onDeleteTopic}
        />
      </div>
      <div className="col-span-3">
        {notes?.map((note) => (
          <div key={note.id} className="mt-5 first:mt-2">
            <NoteCard
              note={note}
              onDelete={function (): void {
                void deleteNote.mutate({ id: note.id });
              }}
              onUpdate={function (title: string, content: string): void {
                void updateNote.mutate({ id: note.id, title, content });
              }}
            />
          </div>
        ))}
        {topics && topics[0] && selectedTopic ? (
          <NoteEditor
            topicTitle={selectedTopic?.title}
            onSave={({ title, content }) => {
              void createNote.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
        ) : (
          <div className="mt-5">Add a topic to create a note</div>
        )}
      </div>
    </div>
  );
};

export default Content;

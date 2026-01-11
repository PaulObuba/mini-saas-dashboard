"use client";

import { Conversation } from "@/app/types/message";
import ConversationItem from "./ConversationItem";
import TextInput from "@/components/ui/TextInput";

export default function ConversationsList({
  conversations,
  activeId,
  query,
  setQuery,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: string;
  query: string;
  setQuery: (val: string) => void;
  onSelect: (id: string) => void;
}) {
  const filtered = conversations.filter((c) =>
    (c.name + c.lastMessage + c.email)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <aside
      className="w-full md:w-80 flex flex-col"
      style={{
        backgroundColor: "var(--background-50)",
        color: "var(--text-700)",
      }}
    >
      <div className="p-4 border-b border-mid-grey">
        <TextInput
          value={query}
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="pl-10"
        />
      </div>

      <div className="overflow-y-auto">
        {filtered.map((c) => (
          <ConversationItem
            key={c.id}
            data={c}
            active={c.id === activeId}
            onSelect={() => onSelect(c.id)}
          />
        ))}
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiPlus, FiTrash, FiUserPlus } from "react-icons/fi";
export const NotionKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-600 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor={"text-neutral-500"}
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Todo"
        column="todo"
        headingColor={"text-neutral-200"}
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Progress"
        column="doing"
        headingColor={"text-neutral-200"}
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor={"text-neutral-200"}
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: {
  title: any;
  headingColor: any;
  column: any;
  cards: any;
  setCards: any;
}) => {
  const [active, setActive] = useState(false);

  const filteredCards = cards.filter((c) => c.column === column);
  return (
    <div className="w-56 shrink-0 ">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} />;
        })}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable="true"
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800
      p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      data-before={beforeId || "-1"}
      data-column={column}
    />
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border
    text-3xl ${
      active
        ? "border-red-800 bg-red-800/20 text-red-500"
        : "border-neutral-500 bg-blue-500/20 text-neutral-500"
    }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((p) => [...p, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 
             bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300
              focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py1.5 text-xs text-neutral-400transition-colors
            hover:text-neutral-50
            "
            >
              Close
            </button>
            <button
              onClick={() => setAdding(false)}
              className="px-3 py1.5 text-xs text-neutral-400transition-colors
            hover:text-neutral-50
            "
            >
              Add
              <FiPlus />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="
            flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400
            transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <FiPlus />
        </button>
      )}
    </>
  );
};

const DEFAULT_CARDS = [
  // backlog
  { title: "Look into render bug", id: "1", column: "backlog" },
  { title: "Implement new feature", id: "2", column: "backlog" },
  { title: "Fix styling issues", id: "3", column: "backlog" },

  // todo
  { title: "Refactor API calls", id: "4", column: "todo" },
  { title: "Write unit tests", id: "5", column: "todo" },
  { title: "Update documentation", id: "6", column: "todo" },

  // doing
  { title: "Debug authentication", id: "7", column: "doing" },
  { title: "Optimize database queries", id: "8", column: "doing" },
  { title: "Add form validation", id: "9", column: "doing" },

  // done
  { title: "Release v1.0.0", id: "10", column: "done" },
  { title: "Merge pull request #123", id: "11", column: "done" },
  { title: "Create release notes", id: "12", column: "done" },
];

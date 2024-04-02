"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [pendingPeople, setPendingPeople] = useState([
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Max Walters",
    },
    {
      id: 3,
      name: "Adam Smith",
    },
    {
      id: 4,
      name: "Tom Johnson",
    },
  ]);

  const [completedPeople, setCompletedPeople] = useState([
    {
      id: 1,
      name: "Tejendra",
    },
    {
      id: 2,
      name: "Rajawat",
    },
  ]);

  const dragPersonOwn = useRef<number>(0);
  const draggedOverPersonOwn = useRef<number>(0);

  function handleDragStart(index: number) {
    dragPersonOwn.current = index;
  }

  function handleDragEnter(index: number) {
    draggedOverPersonOwn.current = index;
  }

  function handleDragEnd(array: any, listType: string) {
    const pendingPeopleClone = [...array];
    const temp = pendingPeopleClone[dragPersonOwn.current];
    pendingPeopleClone[dragPersonOwn.current] =
      pendingPeopleClone[draggedOverPersonOwn.current];
    pendingPeopleClone[draggedOverPersonOwn.current] = temp;
    if (listType === "pending") {
      setPendingPeople(pendingPeopleClone);
    }
    if (listType === "completed") {
      setCompletedPeople(pendingPeopleClone);
    }
  }

  return (
    <>
      <section className="flex gap-36 justify-center">
        <main className="flex flex-col items-center space-y-4 p-4">
          <h1 className="text-2xl font-bold mt-4">Pending List</h1>
          {pendingPeople.map((person, index) => (
            <div
              key={person.id}
              className="relative flex items-center space-x-3 border rounded p-2 bg-gray-100 w-96"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={() => handleDragEnd(pendingPeople, "pending")}
              onDragOver={(e) => e.preventDefault()}
            >
              <p className="text-lg font-semibold">{person.name}</p>
            </div>
          ))}
        </main>

        <main className="flex flex-col items-center space-y-4 p-4">
          <h1 className="text-2xl font-bold mt-4">Completed List</h1>
          {completedPeople.map((person, index) => (
            <div
              key={person.id}
              className="relative flex items-center space-x-3 border rounded p-2 bg-gray-100 w-96"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={() => handleDragEnd(completedPeople, "completed")}
              onDragOver={(e) => e.preventDefault()}
            >
              <p className="text-lg font-semibold">{person.name}</p>
            </div>
          ))}
        </main>
      </section>

      <div className="flex justify-center items-center h-[35rem] overflow-hidden">
        <pre className="w-96 h-[35rem] whitespace-pre-wrap bg-gray-100 p-4 rounded-lg shadow-md overflow-x-auto">
          Pending List: {JSON.stringify(pendingPeople, null, 2)}
          Completed List: {JSON.stringify(completedPeople, null, 2)}
        </pre>
      </div>
    </>
  );
}

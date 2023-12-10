"use client";

import Link from "next/link";
import { Todo } from "@/components/todo";
import { Todo as TodoType } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/todo", {
        method: "GET",
      });
      const data = await res.json();
      setTodos(data.data);
    };
    void fetchData();
  }, []);

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">My todo&apos;s</h1>
        <Link
          className="bg-yellow-300 rounded-md px-4 py-2 text-background hover:bg-yellow-200"
          href="/add-todo"
        >
          Add todo
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {todos?.map((todo) => (
          <Todo
            key={todo.id}
            name={todo.name as string}
            dueDate={todo.dueDate}
          />
        ))}
      </div>
    </div>
  );
}

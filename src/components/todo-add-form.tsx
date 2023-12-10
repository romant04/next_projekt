"use client";

import { FC, FormEvent, useState } from "react";
import { TodoInput } from "@/types/todos";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { LoadingSpinnerWhite } from "@/components/loading-spinner-white";

export const TodoAddForm: FC = () => {
  const router = useRouter();

  const [sent, setSent] = useState(false);
  const [todo, setTodo] = useState<TodoInput>({
    name: "",
    dueDate: undefined,
    category: "Other",
  });

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(todo);
    if (!todo || !todo.category || !todo.name || !todo.dueDate) {
      alert("Vyplň všechny údaje");
      return;
    }

    setSent(true);
    const res = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
    });

    if (res.ok) {
      await router.push("/");
    }
  };

  return (
    <div className="mt-8 md:w-3/4">
      <form onSubmit={handleAdd} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            type="text"
            className="w-full p-2 text-black"
            onChange={(e) => {
              setTodo({
                ...todo,
                name: e.target.value,
              } as TodoInput);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>DueDate:</label>
          <input
            type="date"
            className="text-black max-w-md p-2"
            onChange={(e) => {
              setTodo({
                ...todo,
                dueDate: new Date(e.target.value),
              } as TodoInput);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>category:</label>
          <select
            defaultValue="Other"
            className="text-black py-2"
            onChange={(e) => {
              setTodo({
                ...todo,
                category: e.target.value,
              } as TodoInput);
            }}
          >
            {(Object.keys(Category) as Array<keyof typeof Category>).map(
              (key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              )
            )}
          </select>
        </div>

        <button className="bg-yellow-300 px-4 py-2 text-background hover:bg-yellow-200">
          {sent ? <LoadingSpinnerWhite /> : "Add"}
        </button>
      </form>
    </div>
  );
};

"use client";

import { FC, FormEvent, useState } from "react";
import { TodoInput } from "@/types/todos";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { LoadingSpinnerWhite } from "@/components/loading-spinner-white";

interface EditingProps {
  isEditing: true;
  name: string;
  dueDate: Date;
  id: number;
  category: Category;
}
interface AddingProps {
  isEditing: false;
  name?: string;
  dueDate?: Date;
  id?: number;
  category?: Category;
}

type Props = EditingProps | AddingProps;

export const TodoForm: FC<Props> = ({
  isEditing,
  name,
  dueDate,
  id,
  category,
}) => {
  const router = useRouter();

  const [sent, setSent] = useState(false);
  const [todo, setTodo] = useState<TodoInput>({
    name: name ? name : "",
    dueDate: dueDate ? dueDate : new Date(),
    category: category ? category : Category.Other,
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

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo || !todo.category || !todo.name || !todo.dueDate) {
      alert("Vyplň všechny údaje");
      return;
    }

    setSent(true);
    const res = await fetch(`/api/todo`, {
      method: "PUT",
      body: JSON.stringify({ id: id, ...todo }),
    });

    if (res.ok) {
      await router.push("/");
    }
  };

  return (
    <div className="mt-8 md:w-3/4">
      <form
        onSubmit={isEditing ? handleEdit : handleAdd}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            type="text"
            className="w-full p-2 text-black"
            value={todo.name}
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
            value={
              todo.dueDate &&
              new Date(todo.dueDate).toISOString().substring(0, 10)
            }
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
            defaultValue={todo.category ? todo.category : Category.Other}
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

        <button className="bg-yellow-300 text-xl font-semibold px-4 py-2 text-background hover:bg-yellow-200">
          {sent ? <LoadingSpinnerWhite /> : isEditing ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

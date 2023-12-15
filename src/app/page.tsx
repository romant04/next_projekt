"use client";

import Link from "next/link";
import { Todo } from "@/components/todo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setTodos } from "../../store/todo-slice";
import { LoadingSpinnerWhite } from "@/components/loading-spinner-white";
import { Filters } from "@/components/filters";
import { Category } from "@prisma/client";

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "">("");
  const { todos } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch("/api/todo", {
        method: "GET",
      });
      const data = await res.json();
      dispatch(setTodos(data.data));
      setLoading(false);
    };
    void fetchData();
  }, [dispatch]);

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">My todo&apos;s</h1>
        <Link
          className="bg-yellow-300 rounded-sm px-6 py-2 text-background hover:bg-yellow-200"
          href="/add-todo"
        >
          Add todo
        </Link>
      </div>
      <Filters
        setCategoryFilter={setCategoryFilter}
        setNameFilter={setNameFilter}
      />
      <div className="flex flex-col gap-2 mt-8">
        {loading ? (
          <LoadingSpinnerWhite />
        ) : (
          todos
            ?.filter(
              (x) =>
                x.name?.toLowerCase().includes(nameFilter.toLowerCase()) &&
                (x.category === categoryFilter || categoryFilter === "")
            )
            .map((todo) => (
              <Todo
                id={todo.id}
                done={todo.done}
                category={todo.category}
                key={todo.id}
                name={todo.name as string}
                dueDate={todo.dueDate}
              />
            ))
        )}
      </div>
    </div>
  );
}

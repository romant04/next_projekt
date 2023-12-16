"use client";

import { TodoForm } from "@/components/todo-form";
import { Category, Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { LoadingSpinnerWhite } from "@/components/loading-spinner-white";

export default function EditTodo({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/todo?id=${params.id}`, {
        method: "GET",
      });

      if (!res.ok) {
        setNotFound(true);
        return;
      }

      const data = await res.json();
      setNotFound(false);
      setTodo(data.data);
    };
    void fetchData();
  }, [params]);

  return (
    <div className="text-white">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}>
          <FontAwesomeIcon size="xl" icon={faArrowLeft} />
        </button>
        <h2 className="text-4xl font-semibold">Edit todo</h2>
      </div>
      {todo ? (
        <TodoForm
          isEditing={true}
          name={todo.name as string}
          dueDate={todo.dueDate}
          id={Number(params.id)}
          category={todo.category as Category}
        />
      ) : notFound ? (
        <h3 className="text-xl text-red-600 mt-6">ERROR: Todo not found</h3>
      ) : (
        <LoadingSpinnerWhite />
      )}
    </div>
  );
}

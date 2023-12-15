"use client";

import { TodoForm } from "@/components/todo-form";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function EditTodo() {
  const router = useRouter();
  const params = useSearchParams();
  const [name, dueDate, id, category] = [
    "name",
    "dueDate",
    "id",
    "category",
  ].map((param) => params.get(param));

  return (
    <div className="text-white">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}>
          <FontAwesomeIcon size="xl" icon={faArrowLeft} />
        </button>
        <h2 className="text-4xl font-semibold">Edit todo</h2>
      </div>
      <TodoForm
        isEditing={true}
        name={name as string}
        dueDate={new Date(dueDate as string)}
        id={Number(id)}
        category={category as Category}
      />
    </div>
  );
}

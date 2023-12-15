"use client";

import { TodoForm } from "@/components/todo-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function AddTodo() {
  const router = useRouter();

  return (
    <div className="text-white">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}>
          <FontAwesomeIcon size="xl" icon={faArrowLeft} />
        </button>
        <h2 className="text-4xl font-semibold">Add todo</h2>
      </div>
      <TodoForm isEditing={false} />
    </div>
  );
}

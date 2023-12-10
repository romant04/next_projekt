import Link from "next/link";
import { Todo as TodoType } from ".prisma/client";
import { Todo } from "@/components/todo";

async function getTodos() {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://next-projekt.vercel.app"
    }/api/todo`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return await data.data;
}

export default async function Home() {
  const todos: TodoType[] = await getTodos();

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-5">
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

import { TodoInput } from "@/types/todos";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const res = await prisma.todo.findMany();

    return new Response(JSON.stringify({ status: 200, data: res }));
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, message: error }));
  }
}

export async function POST(req: Request) {
  const todo: TodoInput = await req.json();

  if (!todo || !todo.name || !todo.category || !todo.dueDate) {
    return new Response(
      JSON.stringify({ status: 400, message: "Wrong todo input" })
    );
  }

  const res = await prisma.todo.create({
    data: {
      name: todo.name,
      dueDate: todo.dueDate,
      done: false,
      category: todo.category,
    },
  });

  return new Response(JSON.stringify({ status: 200, message: res }));
}

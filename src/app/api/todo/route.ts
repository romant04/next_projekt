import { TodoInput } from "@/types/todos";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";

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

export async function PUT(req: Request) {
  const todo: Todo = await req.json();

  if (!todo || !todo.name || !todo.category || !todo.dueDate) {
    return new Response(
      JSON.stringify({ status: 400, message: "Wrong todo input" })
    );
  }

  try {
    const updated = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        name: todo.name,
        dueDate: todo.dueDate,
        done: todo.done,
        category: todo.category,
      },
    });

    return new Response(JSON.stringify({ status: 200, message: updated }));
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, message: error }));
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return new Response(
      JSON.stringify({ status: 400, message: "Wrong todo input" })
    );

  try {
    const deleted = await prisma.todo.delete({ where: { id: Number(id) } });

    return new Response(JSON.stringify({ status: 200, message: deleted }));
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, message: error }));
  }
}

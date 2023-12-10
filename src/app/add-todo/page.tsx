import { TodoAddForm } from "@/components/todo-add-form";

export default function AddTodo() {
  return (
    <div className="text-white">
      <h2 className="text-4xl font-semibold">Add todo</h2>
      <TodoAddForm />
    </div>
  );
}

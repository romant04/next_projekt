import { FC, useState } from "react";
import { Category } from "@prisma/client";
import { useDispatch } from "react-redux";
import { removeTodo } from "../../store/todo-slice";
import { LoadingSpinnerWhite } from "@/components/loading-spinner-white";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast } from "react-toastify";

interface Props {
  name: string;
  dueDate: Date;
  id: number;
  category: Category;
  done: boolean;
}

export const Todo: FC<Props> = ({ name, dueDate, id, category, done }) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(done);
  const dispatch = useDispatch();

  const deleteTodo = async () => {
    setLoading(true);
    const res = await fetch(`/api/todo?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      dispatch(removeTodo(id));
    }
    toast.success("Todo deleted successfuly");
    setLoading(false);
  };

  const handleCheck = async () => {
    setChecked(!checked);
    await fetch(`/api/todo`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        done: !checked,
        name: name,
        dueDate: dueDate,
        category: category,
      }),
    });
  };

  return (
    <div className="flex flex-col gap-y-8 md:flex-row justify-between md:items-center bg-primary py-4 px-6 rounded-sm text-white">
      <div className="flex gap-4 items-start md:w-1/3">
        <input
          type="checkbox"
          className="accent-accent"
          checked={checked}
          onChange={handleCheck}
        />
        <div className="flex flex-col gap-1">
          <h4 className="text-xl">{name}</h4>
          <p className="text-sm">{new Date(dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <h4 className="text-xl">Category:</h4>
        <p className="text-sm text-yellow-300">{category}</p>
      </div>

      <div className="flex gap-8 ml-auto md:ml-0">
        <Link href={`/edit-todo/${id}`}>
          <FontAwesomeIcon size="lg" icon={faPenToSquare} />
        </Link>
        {loading ? (
          <LoadingSpinnerWhite />
        ) : (
          <button onClick={deleteTodo}>
            <FontAwesomeIcon
              size="lg"
              className="text-red-500"
              icon={faXmark}
            />
          </button>
        )}
      </div>
    </div>
  );
};

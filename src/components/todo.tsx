import { FC } from "react";

interface Props {
  name: string;
  dueDate: Date;
}

export const Todo: FC<Props> = ({ name, dueDate }) => {
  return (
    <div className="flex justify-between bg-primary p-4 rounded-sm text-white">
      <div className="flex flex-col gap-1">
        <h4 className="text-xl">{name}</h4>
        <p className="text-sm">{new Date(dueDate).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-4">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

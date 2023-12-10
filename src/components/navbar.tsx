import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between text-white py-5 px-8 w-full">
      <h1 className="text-4xl font-light">Todo app</h1>
      <div className="flex gap-5 items-center">
        <h3>roman.tarnai.04@gmail.com</h3>
        <button className="bg-cyan-300 rounded-md px-4 py-2 text-background hover:bg-cyan-200">
          Sign out
        </button>
      </div>
    </div>
  );
};

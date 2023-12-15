import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <>
      <div className="flex items-center justify-between text-white py-5 px-8 w-full">
        <h1 className="text-4xl font-light">Todo app</h1>
      </div>
      <hr className="border-b-[1px] w-[98%] border-gray-200/20 m-auto" />
    </>
  );
};

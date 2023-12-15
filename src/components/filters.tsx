import { Dispatch, FC, SetStateAction } from "react";
import { $Enums, Category } from "@prisma/client";

interface Props {
  setCategoryFilter: Dispatch<SetStateAction<"" | $Enums.Category>>;
  setNameFilter: Dispatch<SetStateAction<string>>;
}

export const Filters: FC<Props> = ({ setCategoryFilter, setNameFilter }) => {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col">
        <label>Filter by name:</label>
        <input
          type="text"
          className="text-black p-2 rounded-sm"
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>Filter by category:</label>
        <select
          defaultValue=""
          className="text-black py-2 rounded-sm"
          onChange={(e) => setCategoryFilter(e.target.value as Category)}
        >
          <option value="">Any</option>
          {(Object.keys(Category) as Array<keyof typeof Category>).map(
            (key) => (
              <option key={key} value={key}>
                {key}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

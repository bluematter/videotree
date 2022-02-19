import { FC, SyntheticEvent } from "react";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/react/outline";

interface IBuilder {
  active: any;
}

const Builder: FC<IBuilder> = () => {
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="p-6" onClick={handleClick}>
      <div className="mb-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700"
          >
            First Option
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="option-1"
              id="option-1"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Option"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="flex mx-auto items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Builder;

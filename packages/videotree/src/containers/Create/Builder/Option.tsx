import { FC } from "react";

interface IOption {
  option: any;
}

const Option: FC<IOption> = ({ option }) => {
  return (
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
            placeholder={option.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Option;

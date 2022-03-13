import { FC } from "react";
import slugify from "slugify";

interface IInput {
  value?: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
}

const Input: FC<IInput> = ({ value, label, placeholder, autoComplete }) => {
  return (
    <div className="mt-3">
      <label
        htmlFor={slugify(label)}
        className="block text-sm font-bold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        name={slugify(label)}
        id={slugify(label)}
        placeholder={placeholder}
        defaultValue={value}
        autoComplete={autoComplete}
        className="mt-1 border-2 placeholder:font-[600] focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Input;

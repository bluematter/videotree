import { FC, SyntheticEvent } from "react";
import {
  PlusSmIcon as PlusSmIconOutline,
  XIcon,
} from "@heroicons/react/outline";
import Option from "./Option";

interface IBuilder {
  active: string;
  schema: any;
  onActive: any;
  onAddOption: any;
}

const Builder: FC<IBuilder> = ({ active, schema, onActive, onAddOption }) => {
  const activeNode = schema.nodes.find((node: any) => node.id === active);

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    onActive("");
  };

  const handleAddOption = () => {
    onAddOption(active);
  };

  return (
    <div className="p-6" onClick={handleClick}>
      <div className="mb-5">
        <XIcon
          className="ml-auto h-6 w-6"
          aria-hidden="true"
          onClick={handleClose}
        />
      </div>
      {activeNode?.data?.options?.map((option: any, index: number) => (
        <Option key={index} option={option} />
      ))}
      <button
        type="button"
        className="flex mx-auto items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleAddOption}
      >
        <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Builder;

import { useState } from "react";
import { createSchema, useSchema } from "beautiful-react-diagrams";
import Header from "./Header";
import LeftColumn from "./Columns/Left";
import RightColumn from "./Columns/Right";
import CustomNode from "../../components/Diagram/Node";

export default function Example() {
  const [active, setActive] = useState<string>("");
  const [schema, { onChange }] = useSchema(
    createSchema({
      nodes: [
        {
          id: "node-custom-0",
          data: {
            onActive: setActive,
          },
          disableDrag: true,
          coordinates: [350, 60],
          render: CustomNode,
          outputs: [
            {
              id: "custom-port-0",
              alignment: "left",
            },
          ],
        },
      ],
    })
  );

  const handleClick = () => {
    setActive("");
  };

  return (
    <div className="min-h-full" onClick={handleClick}>
      <Header />

      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <LeftColumn active={active} />

            {/* Right column */}
            <RightColumn schema={schema} onChange={onChange} />
          </div>
        </div>
      </main>

      <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">
              &copy; 2022 Videotree (a Motionbox company).
            </span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

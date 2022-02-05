import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";
import CustomNode from "./Node";

const initialSchema = createSchema({
  nodes: [
    {
      id: "node-custom-0",
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
    {
      id: "node-custom-1",
      coordinates: [250, 60],
      render: CustomNode,
      inputs: [
        {
          id: "custom-port-1",
          alignment: "left",
        },
      ],
    },
    {
      id: "node-custom-2",
      coordinates: [250, 60],
      render: CustomNode,
      inputs: [
        {
          id: "custom-port-2",
          alignment: "left",
        },
      ],
    },
  ],
});

const TreeDiagram = () => {
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div className="relative" style={{ height: "1000px" }}>
      <Diagram schema={schema} onChange={onChange} />
      <svg
        className="absolute inset-0"
        width={640}
        height={784}
        fill="none"
        viewBox="0 0 640 784"
      >
        <defs>
          <pattern
            id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
            x={118}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={0}
              y={0}
              width={4}
              height={4}
              className="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          x={118}
          width={404}
          height={784}
          fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
        />
      </svg>
    </div>
  );
};

export default TreeDiagram;

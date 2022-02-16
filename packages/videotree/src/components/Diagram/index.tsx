import { FC } from "react";
import Diagram from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";

interface ITreeDiagram {
  schema: any;
  onChange: any;
}

const TreeDiagram: FC<ITreeDiagram> = ({ schema, onChange }) => {
  return (
    <div className="relative" style={{ height: "1000px" }}>
      <Diagram schema={schema} onChange={onChange} />
      <svg
        className="absolute inset-0"
        width={800}
        height={784}
        fill="none"
        viewBox="0 0 800 784"
      >
        <defs>
          <pattern
            id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
            x={0}
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
          x={0}
          width={800}
          height={784}
          fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
        />
      </svg>
    </div>
  );
};

export default TreeDiagram;

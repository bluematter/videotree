import { FC } from "react";
import Diagram from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";

interface ITreeDiagram {
  schema: any;
  onChange: any;
}

const TreeDiagram: FC<ITreeDiagram> = ({ schema, onChange }) => {
  return (
    <div
      className="relative"
      style={{ height: "650px", overflowY: "auto", overflowX: "hidden" }}
    >
      <div style={{ height: 1000 }}>
        <Diagram schema={schema} onChange={onChange} />
      </div>
      <svg
        className="absolute top-[8px] left-[8px]"
        width={785}
        height={1000}
        fill="none"
        viewBox="0 0 785 1000"
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
          width={785}
          height={1000}
          fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
        />
      </svg>
    </div>
  );
};

export default TreeDiagram;

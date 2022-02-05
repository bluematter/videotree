import { FC } from "react";
import TreeDiagram from "src/components/Diagram";

const RightColumn: FC<any> = ({ schema, onChange }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2">
      <section aria-labelledby="section-1-title">
        <h2 className="sr-only" id="section-1-title">
          Section title
        </h2>
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-6">
            <TreeDiagram schema={schema} onChange={onChange} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RightColumn;

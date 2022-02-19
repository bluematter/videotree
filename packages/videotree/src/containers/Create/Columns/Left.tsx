import { FC } from "react";
import Media from "../Media";
import Builder from "../Builder";

interface ILeftProps {
  active: string;
  schema: any;
  onActive: any;
  onAddNode: any;
  onAddOption: any;
}

const Left: FC<ILeftProps> = ({
  active,
  schema,
  onActive,
  onAddNode,
  onAddOption,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <section aria-labelledby="section-2-title">
        <h2 className="sr-only" id="section-2-title">
          Section title
        </h2>
        <div className="rounded-lg bg-white overflow-hidden shadow">
          {active ? (
            <Builder
              active={active}
              schema={schema}
              onActive={onActive}
              onAddOption={onAddOption}
            />
          ) : (
            <Media schema={schema} onActive={onActive} onAddNode={onAddNode} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Left;

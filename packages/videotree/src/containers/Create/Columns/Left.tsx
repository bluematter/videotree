import { FC, Dispatch, SetStateAction } from "react";
import { Node } from "beautiful-react-diagrams/@types/DiagramSchema";
import useMedia from "src/lib/hooks/store/useMedia";
import CustomRender from "../../../components/Diagram/Node";

interface ILeftProps {
  active: string;
  schema: any;
  onActive: any;
  onAddNode: (
    node: Node<{ onActive: Dispatch<SetStateAction<string>> }>
  ) => undefined;
}

const Left: FC<ILeftProps> = ({ active, schema, onActive, onAddNode }) => {
  const { media } = useMedia();

  return (
    <div className="grid grid-cols-1 gap-4">
      <section aria-labelledby="section-2-title">
        <h2 className="sr-only" id="section-2-title">
          Section title
        </h2>
        <div className="rounded-lg bg-white overflow-hidden shadow">
          {active ? (
            <div>Show active {active}</div>
          ) : (
            <div className="p-6">
              {media.map((item: any) => {
                const handleAdd = () => {
                  const newNode: any = {
                    id: `node-${schema.nodes.length + 1}`,
                    content: `Node ${schema.nodes.length + 1}`,
                    coordinates: [
                      schema.nodes[schema.nodes.length - 1].coordinates[0] +
                        100,
                      schema.nodes[schema.nodes.length - 1].coordinates[1],
                    ],
                    render: CustomRender,
                    data: {
                      onActive,
                    },
                    inputs: [{ id: `port-${Math.random()}` }],
                    outputs: [{ id: `port-${Math.random()}` }],
                  };

                  onAddNode(newNode);
                };

                return (
                  <div key={item.id} onClick={handleAdd}>
                    {item.id}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Left;

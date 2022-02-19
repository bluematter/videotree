import { FC } from "react";
import useMedia from "src/lib/hooks/store/useMedia";
import CustomRender from "../../../components/Diagram/Node";
import Builder from "../Builder";

interface ILeftProps {
  active: string;
  schema: any;
  onActive: any;
  onAddNode: any;
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
            <Builder active={active} />
          ) : (
            <div className="p-6">
              <h6 className="font-bold mb-5">Uploaded Videos</h6>
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
                  <div
                    key={item.id}
                    className="py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={handleAdd}
                  >
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

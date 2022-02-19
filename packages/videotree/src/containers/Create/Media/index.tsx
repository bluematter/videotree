import { FC } from "react";
import useMedia from "src/lib/hooks/store/useMedia";
import CustomRender from "../../../components/Diagram/Node";

interface IMedia {
  schema: any;
  onActive: any;
  onAddNode: any;
}

const Media: FC<IMedia> = ({ schema, onActive, onAddNode }) => {
  const { media } = useMedia();

  return (
    <div className="p-6">
      <h6 className="font-bold mb-5">Uploaded Videos</h6>
      {media.map((item: any) => {
        const handleAdd = () => {
          const newNode: any = {
            id: `node-${schema.nodes.length + 1}`,
            content: `Node ${schema.nodes.length + 1}`,
            coordinates: [
              schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
              schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomRender,
            data: {
              active: false,
              onActive,
              options: [
                {
                  title: "First Option",
                },
              ],
            },
            inputs: [
              {
                id: `port-${Math.random()}`,
                alignment: "bottom",
              },
            ],
            outputs: [
              {
                id: `port-${Math.random()}`,
              },
            ],
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
  );
};

export default Media;

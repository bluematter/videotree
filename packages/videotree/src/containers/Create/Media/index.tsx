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
            id: `node-custom-${schema.nodes.length}`,
            content: `Node ${schema.nodes.length}`,
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
                id: `port-${schema.nodes.length}`,
                alignment: "bottom",
              },
            ],
            outputs: [
              {
                id: `custom-port-left-${schema.nodes.length + 1}-0`,
                alignment: "left",
              },
              {
                id: `custom-port-right-${schema.nodes.length + 1}-0`,
                alignment: "right",
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

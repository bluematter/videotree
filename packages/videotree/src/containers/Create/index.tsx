import { useEffect, useState } from "react";
import { createSchema, useSchema } from "beautiful-react-diagrams";
import Header from "./Header";
import LeftColumn from "./Columns/Left";
import RightColumn from "./Columns/Right";
import CustomNode from "../../components/Diagram/Node";
import withUploadZone from "src/lib/withUploadZone";
import { GRAPHQL_ENDPOINT } from "src/constants";
import Cookies from "js-cookie";
import useMedia from "src/lib/hooks/store/useMedia";

const GET_MEDIA = `
  query {
    user {
      media {
        id
        mediaurl
      }
    }
  }
`;

const Create = () => {
  const { addMedia } = useMedia();
  const [active, setActive] = useState<string>("");
  const [schema, { addNode, onChange }] = useSchema(
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

  const getInitialData = () => {
    (async () => {
      try {
        const token = typeof window !== "undefined" && Cookies.get("token");

        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: GET_MEDIA,
          }),
        });

        const { data } = await res.json();

        data.user.media.map((media: any) => {
          addMedia(media);
        });
      } catch (e) {
        console.log("Error fetching user media", {
          e,
        });
      }
    })();
  };

  const handleClick = () => {
    setActive("");
  };

  useEffect(getInitialData, []);

  return (
    <div className="min-h-full" onClick={handleClick}>
      <Header />

      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <LeftColumn
              active={active}
              schema={schema}
              onActive={setActive}
              onAddNode={addNode}
            />

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
};

export default withUploadZone(Create);

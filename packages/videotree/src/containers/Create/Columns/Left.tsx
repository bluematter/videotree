import { FC } from "react";
import useMedia from "src/lib/hooks/store/useMedia";

const Left: FC<any> = ({ active }) => {
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
                return <div key={item.id}>Uploaded Item {item.id}</div>;
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Left;

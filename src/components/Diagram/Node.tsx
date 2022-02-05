import { cloneElement } from "react";

// the diagram model
const CustomNode = (props: any) => {
  const { inputs, outputs } = props;

  return (
    <div
      className="bg-white border-solid border rounded"
      style={{
        width: 100,
        height: 200,
      }}
    >
      <video
        style={{ maxWidth: 100 }}
        className="rounded-2xl"
        muted={true}
        loop={true}
        autoPlay={false}
        playsInline={true}
        src="https://motionbox-rendered.b-cdn.net/ckz8vtosa081809jvt7jh7rbz?t=1644008932614?f=mp4"
      />
      <div className="relative">
        {inputs.map((port: any) =>
          cloneElement(port, {
            style: {
              position: "absolute",
              width: "20px",
              height: "20px",
              background: "#1B263B",
            },
          })
        )}
        {outputs.map((port: any) =>
          cloneElement(port, {
            style: {
              right: 0,
              left: 0,
              margin: "auto",
              position: "absolute",
              width: "20px",
              height: "20px",
              background: "#1B263B",
            },
          })
        )}
      </div>
    </div>
  );
};

export default CustomNode;

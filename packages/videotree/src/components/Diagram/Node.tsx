import { cloneElement } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

// the diagram model
const CustomNode = (props: any) => {
  const { id, data, inputs, outputs } = props;

  const handleActive = (e: any) => {
    e.stopPropagation();
    data.onActive(id);
  };

  return (
    <div
      className={classNames(
        data.active && "shadow-[0_0_0_3px_#2463eb]",
        "bg-white relative border-solid border rounded-2xl cursor-pointer"
      )}
      style={{
        width: 200,
      }}
      onClick={handleActive}
    >
      <>
        {inputs.map((port: any) =>
          cloneElement(port, {
            style: {
              position: "absolute",
              width: "20px",
              height: "20px",
              margin: "auto",
              left: 0,
              right: 0,
              background: "#1B263B",
            },
          })
        )}
        {outputs.map((port: any) =>
          cloneElement(port, {
            style: {
              right: 0,
              left: 0,
              bottom: 20,
              margin: "auto",
              position: "absolute",
              width: "80%",
              height: "20px",
              borderRadius: "100rem",
              background: "#eee",
            },
          })
        )}
      </>
      <video
        style={{ maxWidth: "100%", pointerEvents: "none" }}
        className="rounded-2xl"
        muted={true}
        loop={true}
        autoPlay={false}
        playsInline={true}
        src="https://motionbox-rendered.b-cdn.net/ckz8vtosa081809jvt7jh7rbz?t=1644008932614?f=mp4"
      />
    </div>
  );
};

export default CustomNode;

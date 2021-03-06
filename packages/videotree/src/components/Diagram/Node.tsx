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

  const handlePrevent = (e: any) => {
    e.stopPropagation();
  };

  // TODO: Bug when new option is added
  const connectedMap = props.data?.schema?.links.reduce(
    (acc: any, curr: any) => ({
      ...acc,
      [curr.output]: curr.output,
    }),
    {}
  );

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
              top: -10,
              borderRadius: "100em",
              background: "#333",
            },
          })
        )}
        <div
          className="absolute bottom-[20px] left-0 right-0"
          onClick={handlePrevent}
        >
          {data.options.map((option: any, index: number) => (
            <div className="relative mt-3">
              {!!!(
                connectedMap && connectedMap[outputs[index + 1 + index].key]
              ) &&
                cloneElement(outputs[index + index], {
                  style: {
                    position: "absolute",
                    left: -10,
                    top: 0,
                    bottom: 0,
                    margin: "auto",
                    width: "20px",
                    height: "20px",
                    borderRadius: "100rem",
                    background: "#333",
                  },
                })}
              <div className="py-1 px-3 mx-auto rounded-full text-sm w-[80%] bg-gray-200">
                {option.title}
              </div>
              {!!!(connectedMap && connectedMap[outputs[index + index].key]) &&
                cloneElement(outputs[index + 1 + index], {
                  style: {
                    position: "absolute",
                    right: -10,
                    top: 0,
                    bottom: 0,
                    margin: "auto",
                    width: "20px",
                    height: "20px",
                    borderRadius: "100rem",
                    background: "#333",
                  },
                })}
            </div>
          ))}
        </div>
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

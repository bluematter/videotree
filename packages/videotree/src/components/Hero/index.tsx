/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon } from "@heroicons/react/solid";
import Navigation from "../Navigation";

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <Navigation />

      <div className="container px-4 grid gap-x-6 md:grid-cols-[6fr_4fr] mx-auto">
        <div className="mb-12 relative">
          <a
            href="https://motionbox.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex mb-6 items-center bg-gray-100 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-blue-600"
          >
            <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-blue-500 rounded-full">
              Edit Videos
            </span>
            <span className="ml-4 text-sm">
              Visit Motionbox Our Video Editor
            </span>
            <ChevronRightIcon
              className="ml-2 w-5 h-5 text-gray-500"
              aria-hidden="true"
            />
          </a>
          <h1 className="text-4xl font-honey tracking-tight font-semibold text-gray-900 sm:text-5xl md:text-6xl">
            Give Your Customers A Human Touch In This Digital World
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Interact with your audience asynchronously and create a personalized
            experience while focusing on what matters most.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="inline">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg font-bold text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-6 md:text-xl md:px-12"
              >
                Start Building
              </a>
            </div>
          </div>
        </div>
        <div className="relative flex justify-end mb-12 px-4">
          <div className="relative flex sm:mx-auto justify-end mb-12 px-4 z-50">
            <video
              className="rounded-2xl max-w-xs"
              muted={true}
              loop={true}
              autoPlay={true}
              playsInline={true}
              src="https://motionbox-rendered.b-cdn.net/ckz8vtosa081809jvt7jh7rbz?t=1644008932614?f=mp4"
            />
            <img
              src="https://assets.website-files.com/61589a0e40656a59efdc676c/6158d31593bb5558cda1e9fe_Hero%20Ui.svg"
              loading="lazy"
              alt=""
              className="hidden drop-shadow-md absolute height-[250px] left-[0px] bottom-[-20px] top-[auto] right-[auto]"
            />
          </div>
          <div
            className="pointer-events-none lg:block  absolute inset-0"
            aria-hidden="true"
          >
            <svg
              className="absolute lg:top-[-50px] xs:top-[-30px] lg:left-[-50px]"
              width={640}
              height={784}
              fill="none"
              viewBox="0 0 640 784"
            >
              <defs>
                <pattern
                  id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                  x={118}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                y={72}
                width={640}
                height={640}
                className="text-gray-50"
                fill="currentColor"
              />
              <rect
                x={118}
                width={404}
                height={784}
                fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

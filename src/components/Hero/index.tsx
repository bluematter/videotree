/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container relative py-6 px-4 mx-auto z-10 pb-10 sm:pb-16 md:pb-25 lg:w-full">
        <Popover>
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#" className="font-bold font-honey text-xl">
                  Videotree
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-auto md:pr-4 md:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#"
                className="font-medium py-2 px-4 rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                Log in
              </a>
            </div>
          </nav>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <a
                  href="#"
                  className="block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100"
                >
                  Log in
                </a>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>

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

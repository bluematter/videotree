import { FC } from "react";
import router from "next/router";
import { CheckIcon, MinusIcon } from "@heroicons/react/solid";

interface ITierProps {
  tier: {
    name: string;
    featured?: boolean;
    priceMonthly: number;
    priceAnnually: number;
    description: string;
  };
  isLast?: boolean;
  sections?: any;
  billingCycle: boolean;
  onOpen: (plan: string) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const TierSm: FC<ITierProps> = ({
  tier,
  isLast,
  sections,
  billingCycle,
  onOpen,
}) => {
  const handleClick = () => {
    if (tier.name === "Free") {
      return router.push("/signup");
    }

    if (tier.name === "Enterprise") {
      return (window as any)
        .open(
          "https://oz5lzw72t8z.typeform.com/to/qyMl3XXF#email=xxxxx",
          "_blank"
        )
        .focus();
    }

    onOpen(tier.name);
  };

  return (
    <section key={tier.name}>
      <div className="px-4 mb-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          {tier.name}
        </h2>
        {tier.priceMonthly < 0 || tier.priceMonthly < 0 ? (
          <p className="mt-4">
            <span className="text-4xl font-extrabold text-gray-900">
              Contact Us
            </span>{" "}
          </p>
        ) : (
          <p className="mt-4">
            <span className="text-4xl font-extrabold text-gray-900">
              $
              {!billingCycle
                ? tier.priceMonthly
                : Math.floor(tier.priceAnnually / 12)}
            </span>{" "}
            <span className="text-base font-medium text-gray-500">/mo</span>
          </p>
        )}

        <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
        <button
          onClick={handleClick}
          className={classNames(
            tier.featured
              ? "bg-gradient-to-t from-blue-600 to-blue-500 border-blue-600 hover:bg-blue-700"
              : "bg-gray-800 border-gray-800 hover:bg-gray-900",
            "mt-6 block border rounded-md w-full py-2 text-sm font-semibold text-white text-center"
          )}
        >
          {tier.priceAnnually === 0 || tier.priceMonthly === 0
            ? tier.priceAnnually < 0 || tier.priceMonthly < 0
              ? "Contact Us"
              : "Try Free"
            : `Buy ${tier.name}`}
        </button>
      </div>

      {sections.map((section: any) => (
        <table key={section.name} className="w-full">
          <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
            {section.name}
          </caption>
          <thead>
            <tr>
              <th className="sr-only" scope="col">
                Feature
              </th>
              <th className="sr-only" scope="col">
                Included
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {section.features.map((feature: any) => (
              <tr key={feature.name} className="border-t border-gray-200">
                <th
                  className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                  scope="row"
                >
                  {feature.name}
                </th>
                <td className="py-5 pr-4">
                  {typeof feature.tiers[tier.name] === "string" ? (
                    <span className="block text-sm text-gray-700 text-right">
                      {feature.tiers[tier.name]}
                    </span>
                  ) : (
                    <>
                      {feature.tiers[tier.name] === true ? (
                        <CheckIcon
                          className="ml-auto h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <MinusIcon
                          className="ml-auto h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}

                      <span className="sr-only">
                        {feature.tiers[tier.name] === true ? "Yes" : "No"}
                      </span>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}

      <div
        className={classNames(
          isLast ? "py-5 border-b" : "pt-5",
          "border-t border-gray-200 px-4"
        )}
      >
        <button
          onClick={handleClick}
          className="block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
        >
          <span className="-mb-[3px]">
            {tier.priceAnnually <= 0 || tier.priceMonthly <= 0
              ? tier.priceAnnually < 0 || tier.priceMonthly < 0
                ? "Contact Us"
                : "Try Free"
              : `Access ${tier.name}`}
          </span>
        </button>
      </div>
    </section>
  );
};

export const TierLg: FC<ITierProps> = ({ tier, billingCycle, onOpen }) => {
  const handleClick = () => {
    if (tier.name === "Free") {
      return router.push("/signup");
    }

    if (tier.name === "Enterprise") {
      return (window as any)
        .open(
          "https://oz5lzw72t8z.typeform.com/to/qyMl3XXF#email=xxxxx",
          "_blank"
        )
        .focus();
    }

    onOpen(tier.name);
  };

  return (
    <td
      key={tier.name}
      className={classNames(
        tier.featured && "border-r-2 border-l-2 border-blue-500",
        "h-full py-8 px-6 align-top"
      )}
    >
      <div className="relative h-full table">
        {tier.priceMonthly < 0 || tier.priceMonthly < 0 ? (
          <div className="text-center">
            <span className="text-4xl font-extrabold text-gray-900">
              Contact
            </span>{" "}
            <p className="text-sm mt-2 border-0">We're happy to help</p>
            <p className="mt-4 mb-16 text-sm border-0 text-gray-500">
              {tier.description}
            </p>
          </div>
        ) : (
          <div>
            <span className="text-4xl font-extrabold text-gray-900">
              $
              {!billingCycle
                ? tier.priceMonthly
                : Math.floor(tier.priceAnnually / 12)}
            </span>{" "}
            <span className="text-base font-medium text-gray-500">/mo</span>
            {!billingCycle ? (
              <p className="text-sm mt-2 border-0">{`Billed $${tier.priceMonthly} per user monthly`}</p>
            ) : (
              <p className="text-sm mt-2 border-0">{`Billed $${tier.priceAnnually} per user yearly`}</p>
            )}
            <p className="mt-4 mb-16 text-sm border-0 text-gray-500">
              {tier.description}
            </p>
          </div>
        )}
        <button
          onClick={handleClick}
          className={classNames(
            tier.featured
              ? "bg-gradient-to-t from-blue-600 to-blue-500 border-blue-600 hover:bg-blue-700"
              : "bg-gray-800 border-gray-800 hover:bg-gray-900",
            "absolute bottom-0 flex-grow block w-full border rounded-md 5 py-2 text-md font-semibold text-white text-center"
          )}
        >
          <span className="-mb-[3px]">
            {tier.priceAnnually <= 0 || tier.priceMonthly <= 0
              ? tier.priceAnnually < 0 || tier.priceMonthly < 0
                ? "Contact Us"
                : "Try Free"
              : `Access ${tier.name}`}
          </span>
        </button>
      </div>
    </td>
  );
};

export const FooterTier: FC<ITierProps> = ({ tier, onOpen }) => {
  const handleClick = () => {
    if (tier.name === "Free") {
      return router.push("/signup");
    }

    if (tier.name === "Enterprise") {
      return (window as any)
        .open(
          "https://oz5lzw72t8z.typeform.com/to/qyMl3XXF#email=xxxxx",
          "_blank"
        )
        .focus();
    }

    onOpen(tier.name);
  };

  return (
    <td
      key={tier.name}
      className={classNames(
        tier.featured && "border-r-2 border-l-2 border-b-2 border-blue-500",
        "pt-5 pb-4 px-6"
      )}
    >
      <button
        onClick={handleClick}
        className={classNames(
          tier.featured
            ? "bg-gradient-to-t from-blue-600 to-blue-500 border-blue-600 hover:bg-blue-700"
            : "bg-gray-800 border-gray-800 hover:bg-gray-900",
          "block w-full rounded-md py-2 text-md font-semibold text-white text-center"
        )}
      >
        <span className="-mb-[3px]">
          {tier.priceAnnually <= 0 || tier.priceMonthly <= 0
            ? tier.priceAnnually < 0 || tier.priceMonthly < 0
              ? "Contact Us"
              : "Try Free"
            : `Access ${tier.name}`}
        </span>
      </button>
    </td>
  );
};

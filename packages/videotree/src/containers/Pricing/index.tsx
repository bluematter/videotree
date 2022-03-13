import { Fragment, useState } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/solid";
import { TierLg, TierSm, FooterTier } from "./Tier";
import PaymentModal from "./Modal";
import BillingToggle from "./Toggle";
import Navigation from "src/components/Navigation";
import Footer from "src/components/Footer";

export interface ITier {
  name: string;
  featured?: boolean;
  priceMonthly: number;
  priceAnnually: number;
  description: string;
}

export const tiers: ITier[] = [
  {
    name: "Free",
    priceMonthly: 0,
    priceAnnually: 0,
    description: "A plan to help you get a feeling for Motionbox",
  },
  {
    name: "Basic",
    priceMonthly: 29,
    priceAnnually: 248,
    description: "Basic is great for... well basic video editing needs",
  },
  {
    name: "Premium",
    featured: true,
    priceMonthly: 39,
    priceAnnually: 368,
    description: "Premium quality, great for teams/collaboration",
  },
  {
    name: "Enterprise",
    priceMonthly: -1,
    priceAnnually: -1,
    description: "Ignite your business with video editing tools",
  },
];

export const sections = [
  {
    name: "Video Editing",
    features: [
      {
        name: "Templates",
        tiers: {
          Free: true,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Storage",
        tiers: {
          Free: "2GB",
          Basic: "25GB",
          Premium: "100GB",
          Enterprise: "Unlimited",
        },
      },
      {
        name: "Export Quality",
        tiers: {
          Free: "720p",
          Basic: "1080p",
          Premium: "4k",
          Enterprise: "4k",
        },
      },
      {
        name: "Export Multiple Formats",
        tiers: {
          Free: true,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Minutes Rendered",
        tiers: {
          Free: "10 mins",
          Basic: "60 mins",
          Premium: "Unlimited",
          Enterprise: "Unlimited",
        },
      },
      {
        name: "Watermarks",
        tiers: {
          Free: true,
          Basic: false,
          Premium: false,
          Enterprise: false,
        },
      },
      {
        name: "Projects",
        tiers: {
          Free: "Unlimited",
          Basic: "Unlimited",
          Premium: "Unlimited",
          Enterprise: "Unlimited",
        },
      },
      {
        name: "Support",
        tiers: {
          Free: false,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
    ],
  },
  {
    name: "Collaboration",
    features: [
      {
        name: "Multiplayer",
        tiers: {
          Free: true,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Shareable links",
        tiers: {
          Free: true,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Commenting",
        tiers: {
          Free: true,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Prototyping",
        tiers: {
          Free: false,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Brand Kit",
        tiers: {
          Free: false,
          Basic: false,
          Premium: true,
          Enterprise: true,
        },
      },
    ],
  },
  {
    name: "Developers",
    features: [
      {
        name: "REST APIs",
        tiers: {
          Free: false,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Zapier",
        tiers: {
          Free: false,
          Basic: true,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Webhooks",
        tiers: {
          Free: false,
          Basic: false,
          Premium: true,
          Enterprise: true,
        },
      },
      {
        name: "Whitelabel",
        tiers: {
          Free: false,
          Basic: false,
          Premium: false,
          Enterprise: true,
        },
      },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [billingCycle, setBillingCycle] = useState<boolean>(false);
  const selectedTier = tiers.find((tier) => tier.name === selectedPlan);

  const handleMonthly = () => {
    setBillingCycle(false);
  };

  const handleYearly = () => {
    setBillingCycle(true);
  };

  const handleOpen = (plan: string) => {
    setOpen(!open);
    setSelectedPlan(plan);
  };

  return (
    <>
      <Navigation />
      <div className="bg-white block mb-32">
        <div className="max-w-7xl mx-auto bg-white sm:px-6 lg:px-0">
          <div className="mt-10 mb-32 px-8 sm:flex sm:flex-col sm:align-center">
            <h1 className="text-6xl mb-8 font-extrabold text-gray-900 sm:text-center">
              Pricing Plans
            </h1>
            <BillingToggle
              billingCycle={billingCycle}
              onMonthly={handleMonthly}
              onYearly={handleYearly}
            />
          </div>

          {/* xs to lg */}
          <div className="md:max-w-2xl mx-auto space-y-16 lg:hidden">
            {tiers.map((tier, tierIdx) => (
              <TierSm
                key={tier.name}
                tier={tier}
                isLast={tierIdx < tiers.length - 1}
                sections={sections}
                billingCycle={billingCycle}
                onOpen={handleOpen}
              />
            ))}
          </div>

          {/* lg+ */}
          <div className="hidden lg:block">
            <table className="w-full h-px table-fixed">
              <caption className="sr-only">Pricing plan comparison</caption>
              <thead>
                <tr className="sticky top-[0px] z-10">
                  <th />
                  {tiers.map((tier) => (
                    <th
                      key={tier.name}
                      className={classNames(
                        tier.featured &&
                          "border-r-2 border-l-2 border-t-2 border-blue-500",
                        "bg-white relative pb-4 pt-4 px-6 font-bold text-lg leading-6 text-gray-900 text-center"
                      )}
                      scope="col"
                    >
                      {tier.featured && (
                        <div className="absolute -top-[40px] bg-blue-600 rounded-t-lg -left-[2px] -right-[2px] flex items-center justify-center text-white h-[40px]">
                          <span className="-mb-[3px]">Popular</span>
                        </div>
                      )}
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                <tr>
                  <td />
                  {tiers.map((tier) => (
                    <TierLg
                      key={tier.name}
                      tier={tier}
                      billingCycle={billingCycle}
                      onOpen={handleOpen}
                    />
                  ))}
                </tr>

                {sections.map((section) => (
                  <Fragment key={section.name}>
                    <tr className="border-0">
                      <th
                        className="py-3 pt-16 pl-6 font-bold text-xl text-gray-900 text-left"
                        scope="colgroup"
                      >
                        {section.name}
                      </th>
                      {tiers.map((tier) => (
                        <th
                          key={tier.name}
                          className={classNames(
                            tier.featured &&
                              "border-r-2 border-l-2 border-blue-500",
                            ""
                          )}
                        />
                      ))}
                    </tr>
                    {section.features.map((feature: any) => (
                      <tr key={feature.name}>
                        <th
                          className="py-3 px-6 text-md font-normal text-gray-900 text-left"
                          scope="row"
                        >
                          {feature.name}
                        </th>
                        {tiers.map((tier) => (
                          <td
                            key={tier.name}
                            className={classNames(
                              tier.featured &&
                                "border-r-2 border-l-2 border-blue-500",
                              "text-center"
                            )}
                          >
                            {typeof feature.tiers[tier.name] === "string" ? (
                              <span className="block mx-auto text-md text-gray-500">
                                {feature.tiers[tier.name]}
                              </span>
                            ) : (
                              <>
                                {feature.tiers[tier.name] === true ? (
                                  <CheckIcon
                                    className="h-5 w-5 mx-auto text-blue-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <MinusIcon
                                    className="h-5 w-5 mx-auto text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}

                                <span className="sr-only">
                                  {feature.tiers[tier.name] === true
                                    ? "Included"
                                    : "Not included"}{" "}
                                  in {tier.name}
                                </span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t border-gray-200">
                  <th className="sr-only" scope="row">
                    Choose your plan
                  </th>
                  {tiers.map((tier) => (
                    <FooterTier
                      key={tier.name}
                      tier={tier}
                      sections={sections}
                      billingCycle={billingCycle}
                      onOpen={handleOpen}
                    />
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <Footer />
      <PaymentModal
        billingCycle={billingCycle}
        onMonthly={handleMonthly}
        onYearly={handleYearly}
        open={open}
        planFeatures={sections
          .map((section) =>
            section.features.map((feature) => ({
              name: feature.name,
              value: (feature.tiers as any)[selectedPlan],
            }))
          )
          .flat()
          .slice(0, 8)}
        selectedPlan={selectedPlan}
        selectedTier={selectedTier ? selectedTier : tiers[0]}
        setOpen={setOpen}
      />
    </>
  );
}

import { FC } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface IBillingToggle {
  billingCycle: boolean;
  onMonthly: () => void;
  onYearly: () => void;
}

const BillingToggle: FC<IBillingToggle> = ({
  billingCycle,
  onMonthly,
  onYearly,
}) => {
  return (
    <div className="relative inline-flex w-full sm:w-auto self-center bg-gray-100 rounded-lg p-1 sm:mt-8">
      <button
        type="button"
        className={classNames(
          !billingCycle ? "bg-white shadow-sm text-blue-500" : "text-gray-900",
          "relative w-1/2 border-gray-200 rounded-md py-2 text-md font-bold whitespace-nowrap focus:outline-none focus:ring-0 focus:z-10 sm:w-auto sm:px-8"
        )}
        onClick={onMonthly}
      >
        <span className="-mb-[3px]">Monthly</span>
      </button>
      <button
        type="button"
        className={classNames(
          billingCycle ? "bg-white shadow-sm text-blue-500" : "text-gray-700",
          "ml-0.5 relative w-1/2 rounded-md py-2 text-md font-bold whitespace-nowrap focus:outline-none focus:ring-0 focus:z-10 sm:w-auto sm:px-8"
        )}
        onClick={onYearly}
      >
        <span className="-mb-[3px]">Yearly</span>
      </button>
    </div>
  );
};

export default BillingToggle;

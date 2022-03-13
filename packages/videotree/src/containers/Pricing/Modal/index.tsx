import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/outline";
import PaymentForm from "./Form";
import { ITier } from "../";
import useUser from "../../../lib/hooks/useUser";

interface IPaymentModal {
  billingCycle: boolean;
  onMonthly: () => void;
  onYearly: () => void;
  open: boolean;
  planFeatures: {
    name: string;
    value: string | boolean;
  }[];
  selectedPlan: string;
  selectedTier: ITier;
  setOpen: (open: boolean) => void;
}

const PaymentModal: FC<IPaymentModal> = ({
  billingCycle,
  onMonthly,
  onYearly,
  open,
  planFeatures,
  selectedPlan,
  selectedTier,
  setOpen,
}) => {
  const { user } = useUser();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-gray-50 rounded-lg px-4 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle md:max-w-[56rem] w-100 sm:w-full sm:p-6">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="shadow-sm bg-white p-8 rounded-lg">
                  <h3 className="mb-6 font-bold">{selectedPlan}</h3>
                  <dl className="">
                    {planFeatures.map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          {feature.value === true ||
                          typeof feature.value === "string" ? (
                            <CheckIcon
                              className="absolute h-6 w-6 text-blue-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircleIcon
                              className="absolute h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                          )}
                          <p className="ml-9 text-md leading-6 font-medium text-gray-900">
                            {feature.name}{" "}
                            <b>
                              {typeof feature.value === "string" &&
                                "- " + feature.value}
                            </b>
                          </p>
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="relative">
                  <PaymentForm
                    user={user}
                    billingCycle={billingCycle}
                    onMonthly={onMonthly}
                    onYearly={onYearly}
                    selectedTier={selectedTier}
                    selectedPlan={selectedPlan}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PaymentModal;

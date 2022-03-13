import { FC, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { MICRO_SERVICE_URI, STRIPE_KEY } from "../../../../constants";
import BillingToggle from "../../Toggle";
import StripeForm from "./Stripe";
import { ITier } from "../../";
import { User } from "../../../../types/User";

interface IForm {
  user?: User;
  billingCycle: boolean;
  onMonthly: () => void;
  onYearly: () => void;
  selectedPlan: string;
  selectedTier: ITier;
  onSuccess?: (success: boolean) => void;
}

const stripePromise = loadStripe(STRIPE_KEY);

const Form: FC<IForm> = ({
  user,
  selectedPlan,
  selectedTier,
  billingCycle,
  onMonthly,
  onYearly,
  onSuccess,
}) => {
  const [intentId, setIntentId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    fetch(MICRO_SERVICE_URI + "/api/payments/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setIntentId(data.intentId);
        setClientSecret(data.clientSecret);
      })
      .catch((e) => console.log("Set error", { e }));
  }, []);

  if (!clientSecret)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="animate-spin m-auto h-5 w-5 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="font-bold mt-8">Upgrade to {selectedPlan}</div>
      <div className="mb-24">
        <BillingToggle
          billingCycle={billingCycle}
          onMonthly={onMonthly}
          onYearly={onYearly}
        />
      </div>

      <StripeForm
        user={user}
        intentId={intentId}
        clientSecret={clientSecret}
        billingCycle={billingCycle}
        selectedTier={selectedTier}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default Form;

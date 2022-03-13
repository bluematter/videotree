import { FC, useState, SyntheticEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import Input from "./Input";
import { MICRO_SERVICE_URI } from "../../../../constants";
import { ITier } from "../../";
import { User } from "../../../../types/User";

interface IStripeForm {
  user?: User;
  intentId: string;
  clientSecret: string;
  billingCycle: boolean;
  selectedTier: ITier;
  onSuccess?: (success: boolean) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const validateEmail = (email: string) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const StripeForm: FC<IStripeForm> = ({
  user,
  intentId,
  clientSecret,
  billingCycle,
  selectedTier,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [succeeded] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [, setDisabled] = useState(true);

  const handleChange = async (e: any) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    const email = ((e as any).target[0] as any).value;
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      setIsLoading(false);
      return setError("Email is not valid");
    }

    try {
      if (!cardElement) throw new Error("cardElement is missing");

      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message);
      }

      if (setupIntent) {
        // add customer and payment method to setup intent
        const res = await fetch(
          MICRO_SERVICE_URI + "/api/payments/update-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cycle: billingCycle ? "yearly" : "monthly",
              email,
              intentId,
              paymentMethod: setupIntent.payment_method,
              selectedTier,
            }),
          }
        );

        const response = await res.json();

        if (response.success) {
          // TODO: This depends on if user is logged in or out
          if (user) {
            onSuccess && onSuccess(true);
          } else {
            router.push("/success");
          }
        } else {
          throw new Error("Did not get a successful response");
        }
      }
    } catch (e) {
      setError(`Error ${e}`);
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Input
        value={user?.email}
        label="Email Address"
        placeholder="Enter Your Email Address"
        autoComplete="given-email"
      />

      <div className="mt-3">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Payment
        </label>
        <div className="border-2 py-2 bg-white sm:text-sm border-gray-300 rounded-md overflow-hidden px-2">
          <CardElement
            options={{
              style: {
                base: {
                  backgroundColor: "#fff",
                  fontSize: "16px",
                  fontFamily: "Codec cold",
                },
                invalid: {
                  iconColor: "#dc2626",
                  color: "#dc2626",
                },
              },
            }}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className={classNames(
            (isLoading || !stripe || !elements) &&
              "cursor-not-allowed bg-blue-700",
            "bg-gradient-to-t from-blue-600 to-blue-500 border-blue-600 flex items-center justify-center hover:bg-blue-700 flex-grow block w-full border rounded-md 5 py-2 text-md font-semibold text-white text-center"
          )}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 mr-3 w-5 text-white"
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
          )}
          <span className="-mb-[3px] block py-2">
            Buy {selectedTier.name} $
            {billingCycle
              ? selectedTier.priceAnnually
              : selectedTier.priceMonthly}
          </span>
        </button>
      </div>
      {error && (
        <div className="mt-3 text-red-500 font-medium" role="alert">
          {error}
        </div>
      )}
      {succeeded && (
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded
        </p>
      )}
    </form>
  );
};

export default StripeForm;

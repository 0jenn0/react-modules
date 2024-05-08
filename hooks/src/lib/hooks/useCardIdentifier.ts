import { useState } from "react";

type CardIdentifier = (typeof cardIdentifiers)[number]["name"];

const cardIdentifiers = [
  { name: "Diners", regex: /^36\d{12}$/ },
  { name: "AMEX", regex: /^(?:34|37)\d{13}$/ },
  {
    name: "UnionPay",
    regex:
      /^(622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[0-1]\d|92[0-5])|624\d{13}|625\d{13}|626\d{13}|628[2-8]\d{12})$/,
  },
  { name: "Master", regex: /^(51|52|53|54)/ },
  { name: "Visa", regex: /^4/ },
];

const validateCardIdentifier = (value: string): CardIdentifier | undefined => {
  for (const { name, regex } of cardIdentifiers) {
    if (regex.test(value)) {
      return name;
    }
  }
  return undefined;
};

export const useCardIdentifier = () => {
  const [cardIdentifier, setCardIdentifier] = useState<CardIdentifier | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false);

  const handleCardIdentifierChange = (value: string) => {
    if (!isTouched) setIsTouched(true);
    setCardIdentifier(validateCardIdentifier(value));
  };

  return { cardIdentifier, handleCardIdentifierChange };
};

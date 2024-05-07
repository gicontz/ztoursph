import crypto from 'crypto';

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const getDiscountedPrice = (price: number, discount: number) => {
  return price - (discount / 100) * price;
};

export const uuidTo8Bits = (uuid) => {
  // Hash the UUID using SHA-256
  const hash = crypto.createHash("sha256").update(uuid).digest("hex");
  // Take the first 8 characters of the hash
  const eightCharacterValue = hash.substring(0, 8);
  return eightCharacterValue;
};

export const toCurrency = (value: number | string) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(Number(value));
};

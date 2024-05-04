import Guest from "@components/checkout/guest";
import Button from "@components/commons/button";
import { DatePicker, Divider } from "antd";
import { Poppins, Source_Serif_4 } from "next/font/google";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import checkoutSchema from "@constants/validations/checkout";
import dynamic from "next/dynamic";
import { classNames } from "@app/utils/helpers";
import { disableFutureDates, getAge } from "@constants/dates";
import Dropdown from "@components/commons/dropdown";
import TelephoneInput from "@components/commons/telephone-input";
import Link from "next/link";
import React, { useState } from "react";
import { PREV_LEAD_GUEST } from "@constants/localstorage";

interface MobileNumber {
  countryCode: string;
  number: string;
}

interface FormData {
  firstName: string;
  middleInitial: string;
  lastName: string;
  sex: "M" | "F";
  birthday: Date;
  nationality: string;
  mobileNumber1: MobileNumber;
  mobileNumber2: MobileNumber;
  email: string;
}

const Input = dynamic(() => import("@components/commons/input"), {
  ssr: false,
});

const secondaryFont = Source_Serif_4({
  weight: "800",
  subsets: ["latin"],
});

const Label = ({ ...props }) => (
  <label className="flex-auto mt-4 font-bold" {...props}>
    {props.children}
  </label>
);

const FieldGroup = ({
  additionalClass,
  ...props
}: {
  additionalClass?: string;
  children: React.ReactNode;
}) => (
  <div className={classNames("flex-auto flex flex-col gap-2", additionalClass)}>
    {props.children}
  </div>
);

interface Props {
  onViewItinerary: (data: any) => void;
  onCheckout: (data: any) => void;
}

const CheckoutForm = ({ onViewItinerary, onCheckout }: Props) => {
  const [saveDetail, setSaveDetail] = useState(false);
  const [prevLGD, setPrevLGD] = useState<FormData | undefined>();
  const {
    handleSubmit,
    control,
    formState: { errors, defaultValues },
    watch,
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  React.useEffect(() => {
    const prevData = JSON.parse(
      localStorage.getItem(PREV_LEAD_GUEST) as string
    );
    setPrevLGD(prevData);
  }, []);

  console.log(prevLGD);
  const handleViewItinerary = (e) => {
    e.preventDefault();
    new Promise((resolve) => {
      trigger().then((valid) => {
        if (valid) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }).then((valid) => {
      if (typeof onViewItinerary === "function" && valid)
        onViewItinerary(watch());
    });
  };

  const handleSubmission = async (data) => {
    const content = {
      ...data,
      mobileNumber1: Object.values(data.mobileNumber1).join("-"),
      mobileNumber2: Object.values(data.mobileNumber2).join("-"),
      age: getAge(data.birthday),
    };

    if (saveDetail && localStorage.getItem(PREV_LEAD_GUEST)) {
      localStorage.removeItem(PREV_LEAD_GUEST);
      localStorage.setItem(PREV_LEAD_GUEST, JSON.stringify(data));
    } else if (saveDetail) {
      localStorage.setItem(PREV_LEAD_GUEST, JSON.stringify(data));
    }

    if (typeof onCheckout === "function") onCheckout(content);
  };

  const handleRemeberMe = (data) => {
    setSaveDetail(data.target.checked);
  };

  return (
    <form
      className="flex flex-col space-y-4 lg:w-1/2 w-full lg:mx-auto my-12"
      onSubmit={handleSubmit(handleSubmission)}>
      <h4 className={`text-2xl font-bold ${secondaryFont.className}`}>
        Checkout Details
      </h4>
      <Divider className="!my-2" />
      <p className="text-lg font-bold">Lead Guest Information</p>
      <Label>Name</Label>
      <div className="flex flex-auto flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2">
        <FieldGroup>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Input
                defaultValue={prevLGD?.firstName}
                type="text"
                className="text-base lg:text-sm"
                placeholder="First Name"
                onChange={field.onChange}
                hasError={errors?.firstName !== undefined}
                helperText={errors?.firstName?.message as string}
              />
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={control}
            name="middleInitial"
            render={({ field }) => (
              <Input
                defaultValue={prevLGD?.middleInitial}
                type="text"
                placeholder="Middle Initial"
                className="text-base lg:text-sm"
                onChange={field.onChange}
                maxLength={2}
                hasError={errors?.middleInitial !== undefined}
                helperText={errors?.middleInitial?.message as string}
              />
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Input
                type="text"
                defaultValue={prevLGD?.lastName}
                placeholder="Last Name"
                className="text-base lg:text-sm"
                onChange={field.onChange}
                hasError={errors?.lastName !== undefined}
                helperText={errors?.lastName?.message as string}
              />
            )}
          />
        </FieldGroup>
      </div>
      <Label>Birth Information</Label>
      <div className="flex flex-auto flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2">
        <FieldGroup>
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => (
              <DatePicker
                placeholder="Birthday"
                className="h-12 text-base lg:text-sm"
                showToday={false}
                disabledDate={disableFutureDates}
                onChange={field.onChange}
              />
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={control}
            name="sex"
            render={({ field }) => (
              <Dropdown
                className="!h-[47px] text-base lg:text-sm"
                defaultValue={prevLGD?.sex}
                onChange={field.onChange}
                placeholder="Sex"
                options={[
                  { label: "Male", value: "M" },
                  { label: "Female", value: "F" },
                ]}
                hasError={errors.sex !== undefined}
                helperText={errors.sex?.message}
              />
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={control}
            name="nationality"
            render={({ field }) => (
              <Input
                type="text"
                defaultValue={prevLGD?.nationality}
                placeholder="Nationality"
                className="text-base lg:text-sm"
                onChange={field.onChange}
                hasError={errors?.nationality !== undefined}
                helperText={errors?.nationality?.message as string}
              />
            )}
          />
        </FieldGroup>
      </div>
      <Label>Contact Information</Label>
      <div className="flex flex-auto flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2">
        <FieldGroup>
          <Controller
            control={control}
            name="mobileNumber1"
            render={({ field }) => (
              <TelephoneInput
                type="number"
                placeholder="Mobile Number 1"
                className="text-base lg:text-sm"
                onGetNumber={field.onChange}
                maxLength={10}
                hasError={errors?.mobileNumber1 !== undefined}
                helperText={
                  errors?.mobileNumber1?.countryCode?.message ||
                  errors?.mobileNumber1?.number?.message
                }
              />
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            control={control}
            name="mobileNumber2"
            render={({ field }) => (
              <TelephoneInput
                type="number"
                className="text-base lg:text-sm"
                placeholder="Mobile Number 2"
                onGetNumber={field.onChange}
                maxLength={10}
                hasError={errors?.mobileNumber2 !== undefined}
                helperText={
                  errors?.mobileNumber2?.countryCode?.message ||
                  errors?.mobileNumber2?.number?.message
                }
              />
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                className="text-base lg:text-sm"
                type="email"
                placeholder="Email"
                defaultValue={prevLGD?.email}
                onChange={field.onChange}
                hasError={errors?.email !== undefined}
                helperText={errors?.email?.message as string}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="text-sm text-justify space-y-3">
        <div>
          By proceeding with your booking or reservation, you are indicating
          your agreement with the{" "}
          <Link className="font-semibold" href="/faq#legals-1" target="_blank">
            Terms and Conditions
          </Link>{" "}
          outlined by Z Tours.ph Travel and Tours. If you have any questions or
          concerns, please feel free to contact us for clarification.
        </div>
        <div className="flex space-x-1">
          <input onChange={handleRemeberMe} type="checkbox" />{" "}
          <p>
            Remember this <b>Lead Guest </b> details for future bookings.
          </p>
        </div>
      </div>

      <div className="flex space-x-3 justify-center h-10 !mt-10">
        <Button className="h-full" onClick={handleViewItinerary}>
          View Itinerary
        </Button>
        <Button className="h-full" type="primary" htmlType="submit">
          Checkout
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;

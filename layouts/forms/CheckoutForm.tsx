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

const CheckoutForm = ({
    onViewItinerary,
    onCheckout
}: Props) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        trigger,
    } = useForm({
        resolver: yupResolver(checkoutSchema),
    });

    const handleViewItinerary = (e) => {
        e.preventDefault();
        new Promise(
            (resolve) => {
                trigger().then((valid) => {
                    if (valid) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        ).then((valid) => {
            if (typeof onViewItinerary === 'function' && valid) onViewItinerary(watch());
        });
    }

    const handleSubmission = async (data) => {
        const content = {
            ...data,
            age: getAge(data.birthday),
        };
        if (typeof onCheckout === 'function') onCheckout(content);
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
                        type="text"
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
                        type="text"
                        placeholder="Middle Initial"
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
                        placeholder="Last Name"
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
                                className="h-12"
                                showToday={false}
                                disabledDate={disableFutureDates}
                                onChange={field.onChange} />
                        )}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                    control={control}
                    name="sex"
                    render={({ field }) => (
                        <Dropdown 
                            className="!h-[47px]"
                            onChange={field.onChange}
                            placeholder="Sex"
                            options={[{ label: "Male", value: "M" }, { label: "Female", value: "F" }]}
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
                            placeholder="Nationality"
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
                        <Input
                            type="number"
                            placeholder="Mobile Number 1"
                            onChange={field.onChange}
                            maxLength={10}
                            hasError={errors?.mobileNumber1 !== undefined}
                            helperText={errors?.mobileNumber1?.message as string}
                        />
                    )}
                    />
                </FieldGroup>

                <FieldGroup>
                    <Controller
                    control={control}
                    name="mobileNumber2"
                    render={({ field }) => (
                        <Input
                            type="number"
                            placeholder="Mobile Number 2"
                            onChange={field.onChange}
                            maxLength={10}
                            hasError={errors?.mobileNumber2 !== undefined}
                            helperText={errors?.mobileNumber2?.message as string}
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
                            type="email"
                            placeholder="Email"
                            onChange={field.onChange}
                            hasError={errors?.email !== undefined}
                            helperText={errors?.email?.message as string}
                        />
                    )}
                    />
                </FieldGroup>
            </div>

            <div className="flex space-x-3 justify-center h-10 !mt-10">
                <Button className="h-full" onClick={handleViewItinerary}>View Itinerary</Button>
                <Button className="h-full" type="primary" htmlType="submit">
                    Checkout
                </Button>
            </div>
        </form>
    )
};

export default CheckoutForm;
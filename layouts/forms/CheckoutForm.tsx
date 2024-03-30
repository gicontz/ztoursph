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

const Input = dynamic(() => import("@components/commons/input"), {
    ssr: false,
});

const font = Poppins({
    weight: "400",
    subsets: ["latin"],
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


const CheckoutForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(checkoutSchema),
    });

    const handleSubmition = async (data) => {
        const content = {
            firstname: data.firstname,
            middleInitial: data.middleInitial,
            lastname: data.lastname,
            birthday: data.birthday,
            age: getAge(data.birthday),
            email: data.email,
            mobileNumber1: data.mobileNumber1,
            mobileNumber2: data.mobileNumber2,
            guests: data.guests,
        };
    };
    return (
        <form
            className="flex flex-col space-y-4 lg:w-1/2 w-full lg:mx-auto my-12"
            onSubmit={handleSubmit(handleSubmition)}>
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
                    name="firstname"
                    render={({ field }) => (
                        <Input
                        type="text"
                        placeholder="First Name"
                        onChange={field.onChange}
                        hasError={errors?.firstname !== undefined}
                        helperText={errors?.firstname?.message as string}
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
                    name="lastname"
                    render={({ field }) => (
                        <Input
                        type="text"
                        placeholder="Last Name"
                        onChange={field.onChange}
                        hasError={errors?.lastname !== undefined}
                        helperText={errors?.lastname?.message as string}
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
                <Button className="h-full">View Itinerary</Button>
                <Button className="h-full" type="primary" htmlType="submit">
                    Checkout
                </Button>
            </div>
        </form>
    )
};

export default CheckoutForm;
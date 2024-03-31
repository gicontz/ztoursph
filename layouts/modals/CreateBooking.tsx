import { TCreateBooking, TPaymentData } from "@app/modules/checkout/types";
import { createBooking, getPayments } from "@app/services/checkout";
import { classNames } from "@app/utils/helpers";
import { CloseIcon } from "@chakra-ui/icons";
import Button from "@components/commons/button";
import Loading from "@components/commons/loading";
import { PAYMENT_REDIRECT } from "@constants/nav";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Props {
    bookingInfo: TCreateBooking;
    onClose?: () => void;
}

let APP_SERVER = '';

export const getStaticProps = async () => {
    APP_SERVER = process.env.APP_SERVER || '';
    console.log(process.env.APP_SERVER)
    return {
        props: {
            APP_SERVER
        }
    }

}

const CreateBooking = ({ bookingInfo, onClose }: Props) => {
    const [data, setData] = useState<any>(null);
    const { mutate, isPending } = useMutation({ mutationKey: ['createBooking'], mutationFn: () => createBooking(bookingInfo), onSuccess: (d) => setData(d) });
    const { mutate: mutatePayment, isPending: preparePaymentLoading } = useMutation({ mutationKey: ['payNow'], mutationFn: (param: { paymentData: TPaymentData }) => getPayments(param), onSuccess: (d) => processPayment(d) });
    
    useEffect(() => {
        mutate();
    }, []);

    const bookingDetails = data?.data;

    const redirectUrl = `${window.location.origin}${PAYMENT_REDIRECT}`;

    const handlePay = () => {
        mutatePayment({
            paymentData: {
                bookingId: bookingDetails.id,
                amount: bookingDetails.total_amt,
                userId: bookingDetails.user.id,
                status: 'PENDING',
                paymentType: 'CREDIT CARD',
                redirectUrl: {
                    sucess: redirectUrl,
                    failed: redirectUrl,
                    cancel: redirectUrl,
                }
            }
        });
    }

    const processPayment = (d: { data: { redirectUrl: string } }) => {
        window.location.href = d.data.redirectUrl;
    }

    return (
        <div className="flex flex-col justify-center space-y-8 px-10 pt-4 pb-10 shadow min-w-[350px]">
            <h2 className="flex items-center justify-between text-lg font-bold">
                <span>{isPending ? 'Creating your Booking...' : 'Booked Trips Created!'}</span>
                <CloseIcon className="!w-4 !h-4 cursor-pointer hover:opacity-70 active:opacity-50" onClick={onClose}/>
            </h2>
            <hr className="!mt-1"/>
            {
                isPending ?
                    <Loading />
                :
                data?.status === 202 ?
                    <>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold mb-4">
                                {`${bookingDetails.user.first_name} ${bookingDetails.user.last_name}`}
                            </h3>
                            <p><strong>Booking Date:</strong> {format(bookingDetails.created_date, 'MMM dd, yyyy')}</p>
                            <p><strong>Booking Reference:</strong> {bookingDetails.reference_id.toUpperCase()}</p>
                            <p><strong>Total Price:</strong> {(bookingDetails.total_amt as number).toLocaleString("en-US", { style: "currency", currency: "PHP"})}</p>
                            <p><strong>Email:</strong> {bookingDetails.user.email}</p>
                            <em className="text-lg">Note: Take a screenshot of this for your reference.</em>
                        </div>
                        <Button onClick={handlePay} loading={preparePaymentLoading} type="primary">Pay Now</Button>
                    </>
                :
                    <h2>There was an error creating your booking</h2>
            }
        </div>
    )
}

export default CreateBooking;
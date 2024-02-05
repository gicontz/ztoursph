import { FullWidth, Row } from "@components/commons/common";
import styled from "@emotion/styled";
import ImageTemplate from "@components/tours/image-template";
import TourBookingForm from "@components/commons/tour-booking-form";
import { useRouter } from "next/router";
import { Divider } from "antd";
import PageTitle from "@components/pages/page-title";
import Layout from "@components/pages/layout";
import React from "react";
import { TTourResponse } from "./types";
import { getTourBySlug } from "@app/services/tours";

const PackageDetail = styled.div`
    width: 100%;
    font-size: 1rem;
    gap: 10rem;
`;

const StyledDivider = styled(Divider)`
  border-top: 1px solid #23432c;
  margin: 10px 0;
`;

export default function Tours() {
    const router = useRouter();
    const slug = router.query.slug;
    const [state, setState] = React.useState<{data?: TTourResponse } & { isLoading: boolean }>({
        isLoading: true,
    });

    React.useEffect(() => {
        (
            async () => {
                setState(s => ({ ...s, isLoading: true }));
                if (slug) {
                    const res = await getTourBySlug(slug);
                    setState(({
                        data: { ...res },
                        isLoading: false
                    }))
                }
            }
        )()
    }, [slug]);
    console.log(state);


    return (
        <Layout>
            <FullWidth>
                {   (state.data && !state.isLoading) ? 
                    <PageTitle title={state.data.tour_title} bgImage={state.data.tour_banner_image}/> :
                    <div role="status" className="max-w-full animate-pulse">
                        <div className="h-[350px] bg-gray-200 dark:bg-gray-700 w-full mb-4"></div>
                    </div>
                }
            </FullWidth>
            <Row>
                {   (state.data && !state.isLoading) ? 
                    <div>
                        <p className="text-xl font-semibold">Package Details</p>
                        <p className="font-semibold">₱{state.data.price}</p>
                    </div> :
                    <div role="status" className="max-w-full animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
                    </div>
                }
                <PackageDetail>
                    {   (state.data && !state.isLoading) ? 
                        <pre>
                            {state.data.package_details}
                        </pre> :
                        <div role="status" className="max-w-full animate-pulse">
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mb-4"></div>
                        </div> 
                    }
                </PackageDetail>
            </Row>
            <Row>
                <h4 className="font-bold text-2xl mb-8 mt-8">Gallery</h4>
            </Row>
            <FullWidth>
                { (state.data && !state.isLoading) ? 
                    <ImageTemplate data={state.data.gallery.map((src, i) => ({ src, alt: `${slug}-image-${i+1}`}))} /> :
                    <div role="status" className="flex animate-pulse w-full">
                        <div className="flex grow flex-wrap justify-center w-full">
                            {[...Array(9)].map((v, i) => (
                                <svg key={`${slug}-skeleton-img-${i}`} className="mt-1 w-1/3 h-[350px] text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            ))}
                        </div>
                    </div>
                }
            </FullWidth>
            <StyledDivider />
            <Row className="!max-w-3xl">
                <h4 className="font-bold text-2xl">Book This Tour</h4>
                <TourBookingForm onSubmit={() => {}}/>
            </Row>
            <br />
        </Layout>
    );
}

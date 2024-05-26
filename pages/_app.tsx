"use client";

import "@app/styles/globals.css";
import { SessionProvider } from 'next-auth/react';
import { Providers } from '@providers/chakra';
import type { AppProps } from "next/app";
import DialogProvider from '../providers/dialog';
import PageWrapper from "@components/pages/pageWrapper";
import { useEffect, useState } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { getTours } from "@app/services/tours";
import * as gtag from '../lib/gtag';
import { useRouter } from "next/router";


export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['tours'], queryFn: () => getTours({ pageNumber: 1, pageSize: 4 }) })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(new QueryClient());

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  return (
    <>
      <SessionProvider session={pageProps.session}>
          <Providers>
            <PageWrapper>
              <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                  <DialogProvider>
                    <Component {...pageProps} />
                  </DialogProvider>
                </HydrationBoundary>
              </QueryClientProvider>
            </PageWrapper>
          </Providers>
      </SessionProvider>
    </>
  );
}

export default MyApp;

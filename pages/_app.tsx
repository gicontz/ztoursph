import "@app/styles/globals.css";
import { SessionProvider } from 'next-auth/react';
import { Providers } from '@providers/chakra';
import type { AppProps } from "next/app";
import PageWrapper from "@components/pages/pageWrapper";
import { useState } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getTours } from "@app/services/tours";

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

  return (
    <>
      <SessionProvider session={pageProps.session}>
          <Providers>
            <PageWrapper>
              <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                  <Component {...pageProps} />
                </HydrationBoundary>
              </QueryClientProvider>
            </PageWrapper>
          </Providers>
      </SessionProvider>
    </>
  );
}

export default MyApp;

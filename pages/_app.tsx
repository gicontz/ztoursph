import "@app/styles/globals.css";
import { SessionProvider } from 'next-auth/react';
import { Providers } from '@providers/chakra';
import type { AppProps } from "next/app";
import PageWrapper from "@components/pages/pageWrapper";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <SessionProvider session={pageProps.session}>
        <Providers>
          <PageWrapper>
            <Component {...pageProps} />
          </PageWrapper>
        </Providers>
    </SessionProvider>
  </>
);

export default MyApp;

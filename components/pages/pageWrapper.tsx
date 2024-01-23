import { APP_NAME } from '@constants/env';
import Head from 'next/head';

const PageWrapper = ({ children }) => {

  return (
      <>
        <Head>
          <title>{APP_NAME}</title>
          <link rel="icon" href={`/favicon.ico`} />
        </Head>
        <div>
          {children}
        </div>
      </>
  )
};

export default PageWrapper;


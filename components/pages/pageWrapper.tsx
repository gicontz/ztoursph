import { Added_Trips } from '@constants/added_trips';
import { APP_NAME } from '@constants/env';
import _ from 'lodash';
import Head from 'next/head';
import { useCookies, withCookies } from 'react-cookie';

const PageWrapper = ({ children }) => {
  useCookies([Added_Trips]);
  
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

export default withCookies(PageWrapper);


import { getTrips } from '@app/modules/trips/actions';
import { Added_Trips } from '@constants/added_trips';
import { APP_NAME } from '@constants/env';
import { useTripsContext } from '@providers/trips';
import Head from 'next/head';
import { useEffect } from 'react';
import { useCookies, withCookies } from 'react-cookie';

const PageWrapper = ({ children }) => {
  const [cookie] = useCookies([Added_Trips]);
  const { tripDispatch } = useTripsContext();

  console.log("cookie", cookie);

  useEffect(() => {
    getTrips(tripDispatch, cookie[Added_Trips] ?? []);
  }, []);

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


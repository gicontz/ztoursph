import { ChakraProvider } from '@chakra-ui/react'
import TripsContext from '@app/providers/trips';
import { useTrips } from '@app/modules/trips/actions';
import { CookiesProvider } from 'react-cookie';

export function Providers({ children }: { children: React.ReactNode }) {
  const [tripStore, tripDispatch] = useTrips();

  return (
    <ChakraProvider>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <TripsContext.Provider value={{ tripStore, tripDispatch }}>
          {children}
        </TripsContext.Provider>
      </CookiesProvider>
    </ChakraProvider>
  )
}
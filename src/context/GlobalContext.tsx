import React, { createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface GlobalContextContainerProps {}

interface GlobalConfig {}

export const GlobalContext = createContext<GlobalConfig | undefined>(undefined);

const GlobalContextContainer = ({
  children,
}: React.PropsWithChildren<GlobalContextContainerProps>): React.ReactElement => {
  const value = {};

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        throwOnError: true,
      },
      mutations: {
        throwOnError: false,
        onError: (error) => {
          console.error(error);
        },
      },
    },
  });

  return (
    <GlobalContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'GlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};

export default GlobalContextContainer;

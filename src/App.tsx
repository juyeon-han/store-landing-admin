import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalContextContainer from '@/context/GlobalContext';
import Router from '@/routes';

function App() {
  return (
    <GlobalContextContainer>
      <Router />
      <ReactQueryDevtools />
    </GlobalContextContainer>
  );
}

export default App;

import { ErrorBoundary as ErrorBoundaryWrapper } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from '@/components/fallback/ErrorFallback';

const ErrorBoundary = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundaryWrapper onReset={reset} FallbackComponent={ErrorFallback}>
      <Outlet />
    </ErrorBoundaryWrapper>
  );
};

export default ErrorBoundary;

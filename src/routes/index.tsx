import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SuspenseFallback from '@/components/fallback/SuspenseFallback';
import ErrorBoundaryLayout from '@/routes/layouts/ErrorBoundary';

const DefaultLayout = React.lazy(() => import('@/routes/layouts/Default'));
const Home = React.lazy(() => import('@/pages'));
const Image = React.lazy(() => import('@/pages/image'));
const Post = React.lazy(() => import('@/pages/post'));
const PostDetail = React.lazy(() => import('@/pages/post/detail'));
const NotFound = React.lazy(
  () => import('@/components/fallback/NotFoundFallback')
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/image',
            element: <Image />,
          },
          {
            path: '/post',
            element: <Post />,
          },
          {
            path: '/post/:id',
            element: <PostDetail />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

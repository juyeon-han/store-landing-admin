import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import SuspenseFallback from '@/components/fallback/SuspenseFallback';

const DefaultLayout = lazy(() => import('@/routes/layouts/DefaultLayout'));
const ErrorBoundaryLayout = lazy(
  () => import('@/routes/layouts/ErrorBoundary')
);
const NotFound = lazy(() => import('@/components/fallback/NotFoundFallback'));

const Image = lazy(() => import('@/pages/image'));
const Post = lazy(() => import('@/pages/post'));
const PostDetail = lazy(() => import('@/pages/post/detail'));

const StorePage = lazy(() => import('@/pages/page/store'));
const PromotionPage = lazy(() => import('@/pages/page/promotion'));
const ReviewPage = lazy(() => import('@/pages/page/review'));
const FaqPage = lazy(() => import('@/pages/page/faq'));

export const pathLabel: { [key: string]: string } = {
  page: '페이지 관리',
  store: '지점 관리',
  promotion: '프로모션 관리',
  review: '리뷰',
  faq: 'FAQ',
};

export const paths: { [key: string]: string } = {
  page: '/page',
  store: '/page/store',
  promotion: '/page/promotion',
  review: '/page/review',
  faq: '/page/faq',
};

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to={paths.store} replace />,
          },
          {
            path: paths.page,
            element: <Navigate to={paths.store} replace />,
            children: [
              {
                path: paths.store,
                element: <StorePage />,
              },
              {
                path: paths.promotion,
                element: <PromotionPage />,
              },
              {
                path: paths.review,
                element: <ReviewPage />,
              },
              {
                path: paths.faq,
                element: <FaqPage />,
              },
            ],
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

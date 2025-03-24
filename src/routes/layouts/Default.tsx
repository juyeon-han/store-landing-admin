import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <>
      {/* 고정레이아웃 ex_사이드바 */}
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

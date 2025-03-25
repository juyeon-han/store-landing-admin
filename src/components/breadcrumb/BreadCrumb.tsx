import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import classNames from 'classnames/bind';
import { pathLabel } from '@/routes';
import styles from './BreadCrumb.module.scss';

interface BreadCrumbProps {}

const BreadCrumb = (props: BreadCrumbProps) => {
  const cx = classNames.bind(styles);
  const location = useLocation();
  const [paths, setPaths] = useState<string[]>([]);

  const getPathLabel = (path: string) => {
    return pathLabel[decodeURIComponent(path)] || '알 수 없는 페이지';
  };

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    setPaths(pathSnippets);
  }, [location.pathname]);

  return (
    <AntdBreadcrumb
      className={cx('breadcrumb')}
      items={paths.map((snippet) => ({
        title: getPathLabel(snippet),
      }))}
    />
  );
};

export default BreadCrumb;

import { useState } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { Layout, Menu as AntdMenu, MenuProps, theme } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import logo from '@/assets/images/yakson_logo.png';
import BreadCrumb from '@/components/breadcrumb/BreadCrumb';
import { pathLabel, paths } from '@/routes';
import styles from './DefaultLayout.module.scss';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: paths.page,
    label: pathLabel.page,
    icon: <AppstoreOutlined />,
    children: [
      {
        key: paths.store,
        label: pathLabel.store,
      },
      {
        key: paths.promotion,
        label: pathLabel.promotion,
      },
      {
        key: paths.review,
        label: pathLabel.review,
      },
      {
        key: paths.faq,
        label: pathLabel.faq,
      },
    ],
  },
];

export default function DefaultLayout() {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout className={cx('layout_container')}>
        <Sider
          className={cx('sider')}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <img
            src={logo}
            alt="로고"
            aria-hidden="true"
            className={cx('sider_logo')}
            onClick={() => navigate(paths.store)}
          />
          <AntdMenu
            theme="dark"
            defaultSelectedKeys={[paths.store]}
            defaultOpenKeys={[paths.page]}
            mode="inline"
            items={items}
            onClick={(info) => {
              navigate(info.key);
            }}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <BreadCrumb />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <ScrollRestoration />
    </>
  );
}

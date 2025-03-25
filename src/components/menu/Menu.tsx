import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu as AntdMenu, theme } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import logo from '@/assets/images/yakson_logo.png';
import styles from './Menu.module.scss';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    label: '페이지 관리',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '1-1',
        label: '페이지 관리',
      },
    ],
  },
];

const Menu = () => {
  const cx = classNames.bind(styles);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={cx('menu_container')}>
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
        />
        <AntdMenu
          theme="dark"
          defaultSelectedKeys={['1-1']}
          defaultOpenKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>페이지 관리</Breadcrumb.Item>
            <Breadcrumb.Item>페이지 관리</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            페이지 내용.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Menu;

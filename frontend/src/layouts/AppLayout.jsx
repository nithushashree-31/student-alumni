import React from 'react';
import { Layout, Menu, Avatar, Input } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  MessageOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item>
          <Menu.Item key="3" icon={<MessageOutlined />}>Messages</Menu.Item>
          <Menu.Item key="4">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search..."
              style={{ borderRadius: '20px' }}
            />
          </Menu.Item>
          <Menu.Item key="5">
            <Avatar src="https://joeschmoe.io/api/v1/random" />
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Submenu">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="3">Friends</Menu.Item>
            <Menu.Item key="4">Groups</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px', height: 'calc(100vh - 60px)' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: '#fff',
              height: '100%'
            }}
          >
            Main content area - posts, news feed, etc.
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;

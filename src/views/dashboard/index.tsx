import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button, Badge, Input } from "antd";
import {
  getMenu,
  getSubMenuKeyFromItem,
  PALETTE
} from "../../constants";
import { browserHistory } from "configure-store";
import { useLocation } from "react-router-dom";
import "./index.css";
import {
  getTokenFromSessionStorage,
  getUserInformation,
  clearSessionStorage
} from "__utils/storage-service";
import { MailOutlined, NotificationOutlined, DesktopOutlined, FormOutlined, ExperimentOutlined, PieChartOutlined, BarChartOutlined, SketchOutlined, AppstoreOutlined, LogoutOutlined, CaretDownOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { propsToJS } from "__utils/immutable-to-js";
import { useSelector } from "react-redux";
import InboxSelector from "views/mailbox/inbox/inbox.selector";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props: { children: React.ReactNode }) => {
  const location = useLocation();

  const currentMenu: Array<any> = getMenu();
  const [menuItemFromURL, setMenuItemFromURL] = useState<any>();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const subMenuKeys: Array<string> = getSubMenuKeyFromItem(menuItemFromURL);
  const [openMenuKeys, setOpenMenuKeys] = useState(subMenuKeys);
  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];
  const { unreadMailsCount } = propsToJS(useSelector(InboxSelector));

  useEffect(() => {
    if (!getTokenFromSessionStorage())
      browserHistory.push("/login");
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && getTokenFromSessionStorage()) {
      browserHistory.push({ pathname: "/inbox" });
    } else {
      let defaultpath = location.pathname.substring(1, location.pathname.length);
      let nestedPathPosition = defaultpath.indexOf("/");
      if (nestedPathPosition > 0) {
        let newDefaultPath = defaultpath.substring(0, nestedPathPosition);
        setMenuItemFromURL(newDefaultPath);
      } else {
        setMenuItemFromURL(defaultpath);
      }
    }
  }, [location]);

  const onSubMenuClick = (openKeys: any) => {
    const latestOpenKey = openKeys.find(
      (key: string) => !openMenuKeys.includes(key)
    );
    if (!rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenMenuKeys(openKeys);
    } else {
      setOpenMenuKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onMenuItemClick = ({ key }: { key: string }) => {
    browserHistory.push({ pathname: `/${key}` });
  };

  const logoutUser = () => {
    browserHistory.push("/login");
    clearSessionStorage();
  };

  const LoginUserInfo = () => {
    let userInfo = getUserInformation();
    if (userInfo) {
      return (
        <div>
          <span style={{ marginRight: "20px" }}>
            <Badge count={unreadMailsCount} style={{ backgroundColor: PALETTE.ORANGE }}>
              <MailOutlined style={{ cursor: "pointer", fontSize: "20px" }} />
            </Badge>
          </span>
          <span style={{ marginRight: "20px" }}>
            <Badge count={8} style={{ backgroundColor: PALETTE.GREEN }}>
              <NotificationOutlined style={{ cursor: "pointer", fontSize: "20px" }} />
            </Badge>
          </span>
          <Button onClick={logoutUser}><LogoutOutlined /> Sign out</Button>
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  const HeaderWithMenu = () => (
    <Header className="header" style={{ backgroundColor: "white", boxShadow: "none", borderBottom: "1px solid lightgrey" }}>
      <div style={{ display: "flex" }}>
        <MenuOutlined onClick={() => setCollapsed(!collapsed)} style={{ margin: "15px", backgroundColor: PALETTE.GREEN, color: "white", width: "40px", paddingTop: "10px", cursor: "pointer" }} />
        <Input placeholder="Search for something..." style={{ height: "30px", width: "500px", border: "none", marginTop: "15px" }} />
      </div>
      <LoginUserInfo />
    </Header>
  );
  const SidebarMenu = () => (
    <Sider
      width={240}
      style={{ background: PALETTE.GREY1, fontWeight: "bold" }}
      collapsed={collapsed}
      collapsible={true}
      onCollapse={() => setCollapsed(!collapsed)}
      trigger={null}
    >
      {collapsed ? <div className="header-avatar">IN+</div> :
        <div className="header-avatar-exp">
          <Avatar size={64} icon={<UserOutlined />} />
          <div className="avatar-name">David Williams</div>
          <div className="avatar-details">{getUserInformation()}</div>
          <div className="avatar-details">Art Director <CaretDownOutlined /></div>
        </div>
      }
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[menuItemFromURL]}
        defaultOpenKeys={subMenuKeys}
        openKeys={openMenuKeys}
        onOpenChange={onSubMenuClick}
        onClick={onMenuItemClick}
        style={{ backgroundColor: PALETTE.GREY1 }}
      >
        {currentMenu.map((menuItem: any) => (
          <SubMenu
            key={menuItem.key}
            disabled={menuItem.disabled}
            title={
              <span>
                {getDisplayIcon(menuItem.icon)}
                <span>{menuItem.text}</span>
              </span>
            }
          >
            {menuItem.subMenus.map((innerMenuItem: any) =>
              innerMenuItem.subMenus ? (
                <SubMenu
                  key={innerMenuItem.key}
                  title={<span>{innerMenuItem.text}</span>}
                >
                  {innerMenuItem.subMenus.map((subInnerMenu: any) => (
                    <Menu.Item
                      key={subInnerMenu.key}
                      disabled={subInnerMenu.disabled || false}
                    >
                      {subInnerMenu.text}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                  <Menu.Item
                    key={innerMenuItem.key}
                    disabled={innerMenuItem.disabled || false}
                  >
                    {innerMenuItem.text}
                  </Menu.Item>
                )
            )}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
  const getDisplayIcon = (iconKey: string) => {
    if (iconKey === "dashboardicon") {
      return <AppstoreOutlined />;
    } else if (iconKey === "layoutsicon") {
      return <SketchOutlined />;
    } else if (iconKey === "graphsicon") {
      return <BarChartOutlined />;
    } else if (iconKey === "mailboxicon") {
      return <MailOutlined />;
    } else if (iconKey === "metricsicon") {
      return <PieChartOutlined />;
    } else if (iconKey === "widgetsicon") {
      return <ExperimentOutlined />;
    } else if (iconKey === "formsicon") {
      return <FormOutlined />;
    } else {
      return <DesktopOutlined />;
    }
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <SidebarMenu />
      <Layout
        style={{
          padding: "0px",
          background: "#f5f5f5",
          height: "100%"
        }}
      >
        <HeaderWithMenu />
        <Content style={{ padding: "10px 24px" }}>
          {props.children || "Content"}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;










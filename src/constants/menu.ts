const adminMenus: Array<object> = [{
  key: "main1",
  text: "Dashboards",
  icon: "dashboardicon",
  disabled: true,
  subMenus: []
}, {
  key: "main2",
  text: "Layouts",
  icon: "layoutsicon",
  disabled: true,
  subMenus: []
}, {
  key: "main3",
  text: "Graphs",
  icon: "graphsicon",
  disabled: true,
  subMenus: []
}, {
  key: "main4",
  text: "Mailbox",
  icon: "mailboxicon",
  disabled: false,
  subMenus: [{
    key: "inbox",
    text: "Inbox",
    url: "/inbox",
    disabled: false
  }, {
    key: "email-view",
    text: "Email View",
    disabled: true
  }, {
    key: "compose-email",
    text: "Compose Email",
    disabled: true
  }, {
    key: "email-templates",
    text: "Email Templates",
    disabled: true
  }]
}, {
  key: "main5",
  text: "Metrics",
  icon: "metricsicon",
  disabled: true,
  subMenus: []
}, {
  key: "main6",
  text: "Widgets",
  icon: "widgetsicon",
  disabled: true,
  subMenus: []
}, {
  key: "main7",
  text: "Forms",
  icon: "formsicon",
  disabled: true,
  subMenus: []
}, {
  key: "main8",
  text: "App Views",
  icon: "fundviewoutlined",
  disabled: true,
  subMenus: []
}];

export const getMenu = () => {
  return adminMenus;
}

export const getSubMenuKeyFromItem = (menuItemKey: string) => {

  const currentMenu: any = adminMenus;
  let mainMenuKey = "";
  let i: number = 0;
  let subMenuKey: string = "";
  for (i = 0; i < currentMenu.length; i++) {
    const menuObj = currentMenu[i];
    for (let j = 0; j < menuObj.subMenus.length; j++) {
      /** outer sub mapping for key */
      if (menuObj.subMenus[j].key === menuItemKey) {
        mainMenuKey = menuObj.key;
        break;
      } else if (menuObj.subMenus[j].subMenus) {
        const subInnerArray = menuObj.subMenus[j].subMenus;
        const foundNestedKey = subInnerArray.find(
          (itemObj: { key: string }) => itemObj.key === menuItemKey
        );
        /** if subMenu key found */
        if (foundNestedKey) {
          mainMenuKey = menuObj.key;
          subMenuKey = menuObj.subMenus[j].key;
          break;
        }
      }
    }
    if (mainMenuKey) break;
  }
  const keyArr = [mainMenuKey];
  if (subMenuKey) keyArr.push(subMenuKey);
  return keyArr;
};
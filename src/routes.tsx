/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { AppRoute } from "__utils/type";
import Inbox from "views/mailbox/inbox";
import LoginPage from "views/login";

/**
 * Spreads out routes for V4 router to have a flat hierarchy
 * @param routesData nested routes
 * @param parent recursion path variable to spread path
 * @returns flatRoutes
 */
export const spreadRoutes = (
  routesData: AppRoute[],
  parent = ""
): AppRoute[] => {
  parent = parent === "/" ? "" : parent;
  return routesData.reduce((acc: AppRoute[], route: AppRoute) => {
    return [
      ...acc,
      { ...route, path: parent + route.path },
      ...(route.children
        ? spreadRoutes(route.children, parent + route.path)
        : [])
    ];
  }, []);
};
const withDashboard = (WrappedComponent: any) => (
  <WrappedComponent></WrappedComponent>
);
export const routes: AppRoute[] = [
  {
    key: 1,
    path: "/",
    component: () => withDashboard(Inbox),
    exact: true
  },
  {
    key: 2,
    path: "/home",
    component: () => withDashboard(Inbox),
    exact: true
  },
  {
    key: 3,
    path: "/inbox",
    component: () => withDashboard(Inbox),
    exact: true
  },
  {
    key: 4,
    path: "/login",
    component: () => <LoginPage />,
    exact: true
  },
  // {
  //   key: 29,
  //   component: () => withDashboard(() => <div><h1>Welcome to Master Data Assistant</h1></div>),
  //   path: "**"
  // }
];
export const flatRoutes = spreadRoutes(routes);

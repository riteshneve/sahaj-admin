/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "antd/dist/antd.less";
import "./app.less";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { flatRoutes } from "./routes";
import { AppRoute } from "__utils/type";

import Dashboard from "views/dashboard";
import styled from "styled-components";
import LoginPage from "views/login";

import { ApiResultScreen } from "views/error-screen";

const App: React.FC = () => {
  const FullScreenView = styled.div`
    width: 100%;
  `;
  const dashBoardRoutes = flatRoutes.map((routeContent: any, key: any) => {
    return routeContent.path;
  });

  return (
    <Switch>
      <Route exact path={["/login"]}>
        <FullScreenView>
          <Route exact path="/login" component={LoginPage} />
        </FullScreenView>
      </Route>
      <Route exact path={dashBoardRoutes}>
        <Dashboard>
          {flatRoutes.map((item: AppRoute) => {
            return item.to ? (
              <Route
                key={item.key}
                render={() => <Redirect to={item.to as any} />}
              />
            ) : (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact ? item.exact : false}
                />
              );
          })}
        </Dashboard>
      </Route>
      <Dashboard>
        <Route path="*" component={ApiResultScreen} />
      </Dashboard>
    </Switch>
  );
};

export default App;

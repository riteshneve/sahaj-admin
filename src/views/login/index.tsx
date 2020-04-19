import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Input, Button, Form, message } from "antd";
import { propsToJS } from "__utils/immutable-to-js";
import LoginSelector from "./login.selector";
import { useDeepCompare } from "hooks/use-deep-memo";
import { setSessionStorageItem } from "__utils/storage-service";
import { browserHistory } from "configure-store";
import "./index.css"
import { isUserValid } from "./login.service";

const LoginPage: React.FC = () => {

  const dispatch = useDispatch();

  const { tokenInfo } = propsToJS(useSelector(LoginSelector));

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_LOGIN_TOKEN" });
    }
  }, []);

  useEffect(() => {
    if (tokenInfo) {
      setSessionStorageItem("tokenInfo", JSON.stringify(tokenInfo));

      browserHistory.push({
        pathname: "/inbox"
      });
    }
  }, [useDeepCompare(tokenInfo)]);

  const submitLoginForm = (formData: any) => {
    if (isUserValid(formData)) {
      dispatch({
        type: "LOGIN_API_SUCCESS",
        payload: {
          data: formData.username
        }
      });
    } else {
      message.error('Failed to login. Please enter correct credentials.');
    }
  }

  return (
    <div className="banner-bg" style={{ height: "50rem" }}>
      <div
        id="WelcomePage"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px"
            }}
          >
            <b>Welcome to Sahaj Admin</b>
          </div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "center", width: "250px" }}>
            <Form name="loginForm" onFinish={(values: any) => submitLoginForm(values)} >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your email' }]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Login</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

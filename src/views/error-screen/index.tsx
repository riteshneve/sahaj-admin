import { Result, Button } from "antd"
import React from "react";
import { browserHistory } from "configure-store";


export const ApiResultScreen: React.FC = () => {

  return <Result
    status="404"
    title="404"
    subTitle="Page Not Found"
    extra={<Button type="primary" onClick={() => browserHistory.push('/')}>Back Home</Button>}
  />;

}
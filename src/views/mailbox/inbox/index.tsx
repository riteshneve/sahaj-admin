import React, { useEffect } from "react";
import "./index.css";
import InboxTools from "./inbox-tools";
import Mails from "./mails";
import ComposeEmail from "./compose-mail";
import ReadEmail from "./read-mail";
import { propsToJS } from "__utils/immutable-to-js";
import { useSelector } from "react-redux";
import InboxSelector from "./inbox.selector";
import { INBOX_VIEWS } from "../../../constants";

const Inbox: React.FC = () => {

  const { selectedView } = propsToJS(useSelector(InboxSelector));

  useEffect(() => { }, []);

  const loadView = () => {
    switch(selectedView) {
      case INBOX_VIEWS.READ_MAIL:
        return <ReadEmail />;
      default:
        return <Mails />
    }
  }

  return (
    <div id="inbox" style={{ display: "flex" }}>
      <InboxTools />
      {loadView()}
      <ComposeEmail />
    </div>
  );
};

export default Inbox;

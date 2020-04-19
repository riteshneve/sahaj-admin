import React from "react";
import "./index.css";
import { Button, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { propsToJS } from "__utils/immutable-to-js";
import InboxSelector from "../inbox.selector";
import { useSelector, useDispatch } from "react-redux";
import { INBOX_VIEWS } from "../../../../constants";

const ReadMail: React.FC = () => {

    const dispatch = useDispatch();

    const { selectedMail } = propsToJS(useSelector(InboxSelector));

    const goBackClick = () => {
        dispatch({ type: "SET_SELECTED_VIEW", payload: { data: INBOX_VIEWS.INBOX } });
    }

    return (
        <div className="mails-cont" >
            <div className="inbox-control-panel">
                <div className="inbox-mails-tools">
                    <div style={{ flex: 1 }}>
                        <Button onClick={goBackClick} size={"small"} ><ArrowLeftOutlined /></Button>
                    </div>
                </div>
                <div className="inbox-mails-header">
                    <div style={{ flex: 1, fontSize: "25px" }}>
                        {selectedMail.subject}
                    </div>
                </div>
                <div style={{display: "flex" }}>
                    <div style={{flex: 1}}>From: {selectedMail.from}</div>
                    <div>{selectedMail.timestamp}</div>
                </div>
                <div>To: {selectedMail.to}</div>
                {selectedMail.cc ? <div>CC: {selectedMail.cc}</div> : null}
                <Divider />
                <div>{selectedMail.body}</div>
            </div>
        </div>
    );
};

export default ReadMail;
import React, { useEffect } from "react";
import "./index.css";
import { Button, Badge, Divider, Tag } from "antd";
import { InboxOutlined, MailOutlined, StarOutlined, FileTextOutlined, DeleteOutlined, TagOutlined } from "@ant-design/icons";
import { PALETTE, INBOX_VIEWS } from "../../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { propsToJS } from "__utils/immutable-to-js";
import InboxSelector from "../inbox.selector";

const InboxTools: React.FC = () => {

    const dispatch = useDispatch();

    const { selectedView, unreadMailsCount } = propsToJS(useSelector(InboxSelector));

    useEffect(() => {
    }, []);

    const showNewMailDrawer = () => {
        dispatch({
            type: "SET_SHOW_NEW_MAIL_DRAWER",
            payload: {
                data: true
            }
        });
    };

    const setSelectedView = (view: string): void => {
        dispatch({
            type: "SET_SELECTED_VIEW",
            payload: {
                data: view
            }
        });
    }

    return (
        <div className="inbox-tool">
            <Button onClick={showNewMailDrawer} style={{ width: "100%", backgroundColor: PALETTE.GREEN, color: "white" }}>Compose mail</Button>
            <div className="inbox-tool-group">
                <div className="inbox-tool-group-header">FOLDERS</div>
                <div className="inbox-tool-group-list">
                    <div onClick={() => setSelectedView(INBOX_VIEWS.INBOX)} className={selectedView === INBOX_VIEWS.INBOX ? "inbox-tool-group-item inbox-tool-group-item-sel" : "inbox-tool-group-item"}>
                        <InboxOutlined />
                        <span className="inbox-tool-group-item-text">Inbox</span>
                        <span style={{ float: "right" }}>
                            <Badge count={unreadMailsCount} style={{ backgroundColor: PALETTE.ORANGE }} />
                        </span>
                        <Divider style={{ margin: "8px 0px" }} />
                    </div>
                    <div onClick={() => setSelectedView(INBOX_VIEWS.SENT)} className={selectedView === INBOX_VIEWS.SENT ? "inbox-tool-group-item inbox-tool-group-item-sel" : "inbox-tool-group-item"}>
                        <MailOutlined />
                        <span className="inbox-tool-group-item-text">Sent Mails</span>
                        <Divider style={{ margin: "8px 0px" }} />
                    </div>
                    <div className="inbox-tool-group-item">
                        <StarOutlined />
                        <span className="inbox-tool-group-item-text">Important</span>
                        <Divider style={{ margin: "8px 0px" }} />
                    </div>
                    <div className="inbox-tool-group-item">
                        <FileTextOutlined />
                        <span className="inbox-tool-group-item-text">Drafts</span>
                        <span style={{ float: "right" }}>
                            <Badge count={2} />
                        </span>
                        <Divider style={{ margin: "8px 0px" }} />
                    </div>
                    <div className="inbox-tool-group-item">
                        <DeleteOutlined />
                        <span className="inbox-tool-group-item-text">Trash</span>
                        <Divider style={{ margin: "8px 0px" }} />
                    </div>
                </div>
            </div>
            <div className="inbox-tool-group">
                <div className="inbox-tool-group-header">CATEGORIES</div>
                <div className="inbox-tool-group-list">
                    <div className="inbox-tool-group-item">
                        <span className="custom-circle" style={{ backgroundColor: PALETTE.BACKGROUND_GREEN_DARK }}></span>
                        <span className="inbox-tool-group-item-text">Work</span>
                    </div>
                    <div className="inbox-tool-group-item">
                        <span className="custom-circle" style={{ backgroundColor: PALETTE.DANGER }}></span>
                        <span className="inbox-tool-group-item-text">Documents</span>
                    </div>
                    <div className="inbox-tool-group-item">
                        <span className="custom-circle" style={{ backgroundColor: PALETTE.BLUE }}></span>
                        <span className="inbox-tool-group-item-text">Social</span>
                    </div>
                    <div className="inbox-tool-group-item">
                        <span className="custom-circle" style={{ backgroundColor: PALETTE.BACKGROUND_BLUE }}></span>
                        <span className="inbox-tool-group-item-text">Advertising</span>
                    </div>
                    <div className="inbox-tool-group-item">
                        <span className="custom-circle" style={{ backgroundColor: PALETTE.ORANGE }}></span>
                        <span className="inbox-tool-group-item-text">Clients</span>
                    </div>
                </div>
            </div>
            <div className="inbox-tool-group">
                <div className="inbox-tool-group-header">Labels</div>
                <div className="inbox-tool-group-list" style={{}}>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Family</Tag>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Work</Tag>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Home</Tag>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Children</Tag>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Holidays</Tag>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Music</Tag>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Photography</Tag>
                    <Tag style={{ marginBottom: "4px" }}><TagOutlined /> Film</Tag>
                </div>
            </div>
        </div>
    );
};

export default InboxTools;

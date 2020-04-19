import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Button, Radio } from "antd";
import Search from "antd/lib/input/Search";
import { EyeOutlined, ExclamationOutlined, SyncOutlined, DeleteOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { PALETTE, INBOX_VIEWS } from "../../../../constants";
import { getUserInformation } from "__utils/storage-service";
import { propsToJS } from "__utils/immutable-to-js";
import InboxSelector from "../inbox.selector";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultMailList, getEmailListForUser, inboxColumns, sentColumns, getSentListForUser, markMailAsRead, deleteSentMailsById, deleteInboxMailsById } from "../inbox.service";
import { MailView } from "../inbox.types";

const Mails: React.FC = () => {

    const dispatch = useDispatch();

    const { emailList, selectedView, unreadMailsCount } = propsToJS(useSelector(InboxSelector));
    const [columns, setColumns] = useState<any[]>([]);
    const [selectedMails, setSelectedMails] = useState<any[]>([]);

    useEffect(() => {
        // set default mail list
        setDefaultMailList();
        dispatch({
            type: "SET_SELECTED_VIEW",
            payload: {
                data: INBOX_VIEWS.INBOX
            }
        });
    }, []);

    useEffect(() => {
        changeDataByView();
    }, [selectedView]);

    const changeDataByView = () => {
        let emailsForUser: MailView[] = [];
        switch (selectedView) {
            case INBOX_VIEWS.SENT:
                setColumns(sentColumns);
                emailsForUser = getSentListForUser(getUserInformation());
                break;
            default: // default view is inbox
                setColumns(inboxColumns);
                emailsForUser = getEmailListForUser(getUserInformation());
                console.log(emailsForUser);
                dispatch({
                    type: "SET_UNREAD_MAILS_COUNT",
                    payload: {
                        data: emailsForUser.map((email) => email.read && email.showInInbox ? 0 : 1).reduce((total: number, num: number) => {
                            return total + num
                        }, 0)
                    }
                });
        }
        dispatch({
            type: "SET_EMAIL_LIST",
            payload: {
                data: emailsForUser
            }
        });
        setSelectedMails([]);
    }

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            setSelectedMails(selectedRows.filter((row: any) => row));
        },
    };

    const refreshMails = () => {
        changeDataByView();
    }

    const getRowColor = (record: MailView) => {
        if (selectedView === INBOX_VIEWS.INBOX && !record.read) return "table-row-light";
        return "table-row-dark"
    }

    const openMail = (mail: MailView) => {
        dispatch({
            type: "SET_SELECTED_VIEW",
            payload: {
                data: INBOX_VIEWS.READ_MAIL
            }
        });
        dispatch({
            type: "SET_SELECTED_MAIL",
            payload: {
                data: mail
            }
        });
        if (!mail.read && selectedView === INBOX_VIEWS.INBOX) dispatch({ type: "DEC_UNREAD_MAILS_COUNT", payload: {} });
        markMailAsRead(parseInt(mail.key));
        changeDataByView();
    }

    const deleteMails = () => {
        console.log(selectedMails);
        switch (selectedView) {
            case INBOX_VIEWS.SENT:
                deleteSentMailsById(selectedMails.map((email: MailView) => parseInt(email.key)));
                break;
            default:
                deleteInboxMailsById(selectedMails.map((email: MailView) => parseInt(email.key)));
        }
        changeDataByView();
    }

    return (
        <div className="mails-cont" >
            <div className="inbox-control-panel">
                <div className="inbox-mails-header">
                    <div style={{ flex: 1, fontSize: "25px" }}>
                        {selectedView === INBOX_VIEWS.INBOX ? `Inbox (${unreadMailsCount})` : "Sent Mails"}
                    </div>
                    <div>
                        <Search
                            placeholder="Search email"
                            enterButton={<Button style={{ backgroundColor: PALETTE.GREEN, color: "white" }}>Search</Button>}
                            onSearch={value => console.log(value)}
                        />
                    </div>
                </div>
                <div className="inbox-mails-tools">
                    <div style={{ flex: 1 }}>
                        <Button onClick={refreshMails} size={"small"} style={{ marginRight: "4px" }}><SyncOutlined /> Refresh</Button>
                        <Button size={"small"} style={{ marginRight: "4px" }}><EyeOutlined /></Button>
                        <Button size={"small"} style={{ marginRight: "4px" }}><ExclamationOutlined /></Button>
                        <Button onClick={deleteMails} size={"small"}><DeleteOutlined /></Button>
                    </div>
                    <Radio.Group size={"small"}>
                        <Radio.Button value="left"><ArrowLeftOutlined /></Radio.Button>
                        <Radio.Button value="right"><ArrowRightOutlined /></Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            <div className="inbox-table-cont">
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowClassName={(record) => getRowColor(record)}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                openMail(record);
                            },
                        };
                    }}
                    columns={columns}
                    dataSource={emailList}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default Mails;
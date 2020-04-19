import React, { useEffect } from "react";
import "./index.css";
import { Drawer, Input, Button, Form } from "antd";
import InboxSelector from "../inbox.selector";
import { useSelector, useDispatch } from "react-redux";
import { propsToJS } from "__utils/immutable-to-js";
import { getUserInformation } from "__utils/storage-service";
import { saveEmail, getSentListForUser } from "../inbox.service";
import { MailView } from "../inbox.types";
import { INBOX_VIEWS } from "../../../../constants";

const ComposeEmail: React.FC = () => {

    const dispatch = useDispatch();

    const { selectedView, showNewMailDrawer } = propsToJS(useSelector(InboxSelector));
    const [emailForm] = Form.useForm();

    useEffect(() => {
    }, []);

    useEffect(() => { }, [showNewMailDrawer]);

    const hideNewMailDrawer = () => {
        dispatch({
            type: "SET_SHOW_NEW_MAIL_DRAWER",
            payload: {
                data: false
            }
        });
    }

    const onEmailSend = (emailFormValues: any) => {
        saveEmail({
            id: -1,
            from: getUserInformation(),
            to: emailFormValues.emailto.split(";"),
            cc: emailFormValues.cc ? emailFormValues.cc.split(";") : [],
            subject: emailFormValues.subject,
            body: emailFormValues.body,
            timestamp: new Date(),
            read: false,
            showInInbox: true,
            showInSent: true
        });
        emailForm.resetFields();
        hideNewMailDrawer();
        if (selectedView === INBOX_VIEWS.SENT) {
            let emailsForUser: MailView[] = getSentListForUser(getUserInformation());
            dispatch({
                type: "SET_EMAIL_LIST",
                payload: {
                    data: emailsForUser
                }
            });
        }
    }

    return (
        <Drawer
            title="Compose a new email"
            width={600}
            onClose={hideNewMailDrawer}
            visible={showNewMailDrawer}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <div>
                <Form
                    name="emailForm"
                    form={emailForm}
                    onFinish={(values: any) => onEmailSend(values)}
                >
                    <Form.Item
                        name="emailto"
                        rules={[{ required: true, message: 'Please enter recipient' }]}
                    >
                        <Input prefix="To" placeholder="Email To" />
                    </Form.Item>
                    <Form.Item name="cc" >
                        <Input prefix="CC" placeholder="" />
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        rules={[{ required: true, message: 'Please enter subject' }]}
                    >
                        <Input placeholder="Subject" />
                    </Form.Item>
                    <Form.Item
                        name="body"
                        rules={[{ required: true, message: 'Please enter email content' }]}
                    >
                        <Input.TextArea placeholder="Email Body" autoSize={{ minRows: 10 }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Send</Button>
                    </Form.Item>
                </Form>
            </div>
        </Drawer>
    );
};

export default ComposeEmail;

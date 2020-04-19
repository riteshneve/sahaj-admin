import { Mail, MailView } from "./inbox.types";
import moment from "moment";
import { getEmailListFromStorage, setEmailListFromStorage } from "__utils/storage-service";

export const inboxColumns = [
    { title: '', dataIndex: 'from', ellipsis: true, },
    { title: '', dataIndex: 'subject', ellipsis: true, },
    { title: '', dataIndex: 'timestamp', className: 'column-right-align', },
];
export const sentColumns = [
    { title: '', dataIndex: 'to', ellipsis: true, },
    { title: '', dataIndex: 'subject', ellipsis: true, },
    { title: '', dataIndex: 'timestamp', className: 'column-right-align', },
];

const defaultMailList: Mail[] = [
    {
        id: 5,
        from: "test1@test.com",
        to: ["test3@test.com"],
        cc: [""],
        subject: "Some subject line 6",
        body: "Email body 12345",
        timestamp: new Date("2020-04-18 01:01:01"),
        read: false,
        showInInbox: true,
        showInSent: true
    }, {
        id: 4,
        from: "test3@test.com",
        to: ["test1@test.com"],
        cc: [""],
        subject: "Some subject line 5",
        body: "Email body 12345",
        timestamp: new Date("2020-02-02 01:01:01"),
        read: false,
        showInInbox: true,
        showInSent: true
    }, {
        id: 3,
        from: "test2@test.com",
        to: ["test1@test.com"],
        cc: [""],
        subject: "Some subject line 4",
        body: "Email body 12345",
        timestamp: new Date("2020-01-25 01:01:01"),
        read: false,
        showInInbox: true,
        showInSent: true
    }, {
        id: 2,
        from: "test4@test.com",
        to: ["test2@test.com"],
        cc: [""],
        subject: "Some subject line 3",
        body: "Email body 12345",
        timestamp: new Date("2020-03-20 01:01:01"),
        read: false,
        showInInbox: true,
        showInSent: true
    }, {
        id: 1,
        from: "test3@test.com",
        to: ["test2@test.com"],
        cc: [""],
        subject: "Some subject line 2",
        body: "Email body 12345",
        timestamp: new Date("2020-03-02 01:01:01"),
        read: false,
        showInInbox: true,
        showInSent: true
    }, {
        id: 0,
        from: "test1@test.com",
        to: ["test2@test.com"],
        cc: [""],
        subject: "Some subject line 1",
        body: "Email body 12345",
        timestamp: new Date("2020-03-20 01:01:01"),
        read: false,
        showInInbox: true,
        showInSent: true
    }
];

const getUsernameFromMail = (email: string): string => {
    return email.split("@")[0];
}

export const getMailViewFromMails = (mails: Mail[]): MailView[] => {
    return mails.map((mail: Mail) => {
        return {
            key: mail.id.toString(),
            from: getUsernameFromMail(mail.from),
            to: mail.to.map((email: string) => getUsernameFromMail(email)).join(", "),
            cc: mail.cc.map((email: string) => getUsernameFromMail(email)).join(", "),
            subject: mail.subject,
            body: mail.body,
            timestamp: getUserFriendlyTimestamp(mail.timestamp),
            read: mail.read,
            showInInbox: mail.showInInbox,
            showInSent: mail.showInSent
        };
    });
};

const getUserFriendlyTimestamp = (timestamp: Date): string => {
    if (moment().diff(timestamp, "day") === 0) return moment(timestamp).format("HH:MM A");
    else if (moment().diff(timestamp, "day") === 1) return "Yesterday";
    else return moment(timestamp).format("MMMM YY");
};

export const getSentListForUser = (fromEmail: string): MailView[] => {
    let mails: Mail[] = getEmailListFromStorage();
    return getMailViewFromMails(
        mails.filter((email) => {
            return email.from === fromEmail && email.showInSent;
        })
    );
}

export const getEmailListForUser = (toEmail: string): MailView[] => {
    let mails: Mail[] = getEmailListFromStorage();
    return getMailViewFromMails(mails.filter((email: Mail) => {
        return (email.to && email.showInInbox ? email.to.includes(toEmail) : false) || (email.cc ? email.cc.includes(toEmail) : false);
    }));
}

export const saveEmail = (email: Mail) => {
    if (email) {
        let mails: Mail[] = getEmailListFromStorage();
        mails.unshift(Object.assign({}, email, { id: mails[0].id + 1 }));
        setEmailListFromStorage(mails);
    }
}

export const setDefaultMailList = () => {
    let mails: Mail[] = getEmailListFromStorage();
    if (!mails || mails.length === 0) setEmailListFromStorage(defaultMailList);
}

export const markMailAsRead = (id: number) => {
    let mails: Mail[] = getEmailListFromStorage();
    let updatedMail: Mail[] = mails.map((mail: Mail) => {
        if (mail.id === id) mail.read = true;
        return mail;
    });
    setEmailListFromStorage(updatedMail);
}

export const deleteInboxMailsById = (ids: number[]) => {
    let mails: Mail[] = getEmailListFromStorage();
    let updatedMail: Mail[] = mails.map((mail: Mail) => {
        if (ids.includes(mail.id)) mail.showInInbox = false;
        return mail;
    });
    setEmailListFromStorage(updatedMail);
}

export const deleteSentMailsById = (ids: number[]) => {
    let mails: Mail[] = getEmailListFromStorage();
    let updatedMail: Mail[] = mails.map((mail: Mail) => {
        if (ids.includes(mail.id)) mail.showInSent = false;
        return mail;
    });
    setEmailListFromStorage(updatedMail);
}
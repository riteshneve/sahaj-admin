export interface Mail {
    id: number,
    from: string,
    to: string[],
    cc: string[],
    subject: string,
    body: string,
    timestamp: Date,
    read: boolean,
    showInInbox: boolean,
    showInSent: boolean
}

export interface MailView {
    key: string,
    from: string,
    to: string,
    subject: string,
    body: string,
    timestamp: string,
    read: boolean,
    showInInbox: boolean,
    showInSent: boolean
}
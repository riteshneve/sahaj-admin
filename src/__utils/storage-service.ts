import { Mail } from "views/mailbox/inbox/inbox.types";

export const setSessionStorageItem = (key: string, value: string) => {
    window.sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: string) => {
    return window.sessionStorage.getItem(key);
};

export const getTokenFromSessionStorage = () => {
    let tokenString: any = window.sessionStorage.getItem("tokenInfo");
    if (tokenString) return tokenString;
    else return null;
};

export const getUserInformation = () => {
    let tokenString: any = window.sessionStorage.getItem("tokenInfo");
    if (tokenString) return JSON.parse(tokenString);
    else return null;
}

export const clearSessionStorage = () => {
    window.sessionStorage.clear();
}

export const getEmailListFromStorage = (): Mail[] => {
    let emailsString = window.localStorage.getItem("emails");
    return emailsString ? JSON.parse(emailsString) : [];
}

export const setEmailListFromStorage = (emails: Mail[]): void => {
    window.localStorage.setItem("emails", JSON.stringify(emails));
}
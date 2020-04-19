import { UserDetails, allowedUsers } from "./login.types";

export const isUserValid = (userData: UserDetails): boolean => {
    let validUser: boolean = false;
    allowedUsers.forEach(allowedUser => {
        if (allowedUser.username === userData.username && allowedUser.password === userData.password) validUser = true;
    });
    return validUser;
}
export interface UserDetails {
    username: string;
    password: string;
};

export const allowedUsers: UserDetails[] = [
    {
        username: "test1@test.com",
        password: "123"
    }, {
        username: "test2@test.com",
        password: "123"
    }, {
        username: "test3@test.com",
        password: "123"
    }
];
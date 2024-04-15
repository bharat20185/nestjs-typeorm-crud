export interface AuthToken {
    accessToken: string;
}

export interface UserTokenPayload {
    id: number;
    name: string;
    username: string;
    email: string;
}
export interface PostInterface {
    id: number;
    title: string;
    body: string;
    user: {
        id: number;
        name: string;
        username: string;
        email: string;
    };
}
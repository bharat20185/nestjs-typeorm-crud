export interface TodoInterface {
    id: number;
    title: string;
    completed: boolean;
    user: {
        id: number;
        name: string;
        username: string;
        email: string;
    };
}
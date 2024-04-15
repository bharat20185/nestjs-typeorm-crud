export class CommentInterface {
    id: number;
    name: string;
    email: string;
    body: string;
    post: {
        id: number;
    };
}
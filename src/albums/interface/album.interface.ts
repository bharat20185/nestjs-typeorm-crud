export interface AlbumInterface {
    id: number;
    title: string;
    user?: {
        id: number;
        name: string;
        username: string;
        email: string;
    };
}
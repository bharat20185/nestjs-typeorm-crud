export class PhotoInterface {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    album: {
        id: number;
        title: string;
    };
}
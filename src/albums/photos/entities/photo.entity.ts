import { Album } from "src/albums/entities/album.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({length: 255, nullable: true})
    title: string;

    @Column({length: 255, nullable: true})
    url: string;
    
    @Column({length: 255, nullable: true})
    thumbnailUrl: string;
    
    @ManyToOne(() => Album, album => album.photos)
    @JoinColumn()
    album: Album;
}

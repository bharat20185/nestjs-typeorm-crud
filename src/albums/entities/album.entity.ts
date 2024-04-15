import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "../photos/entities/photo.entity";

@Entity('albums')
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: true})
    title: string;

    @ManyToOne(() => User, user => user.albums)
    @JoinColumn()
    user: User;

   @OneToMany(() => Photo, photo => photo.album)
   photos: Photo[]
}

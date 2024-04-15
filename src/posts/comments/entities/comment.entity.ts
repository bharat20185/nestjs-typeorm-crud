import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: false})
    name: string;

    @Column({length: 255, nullable: true})
    email: string;

    @Column({type: 'text', nullable: true})
    body: string;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn()
    post: Post;
}

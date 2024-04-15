import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Comment } from "../comments/entities/comment.entity";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: false})
    title: string;

    @Column({type: 'text', nullable: true})
    body: string;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    user: User;

    @OneToMany(() => Comment, comment => comment.post, {cascade: true})
    comments: Comment[];
}

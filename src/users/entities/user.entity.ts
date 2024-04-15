import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from "argon2";
import { Todo } from "src/todos/entities/todo.entity";
import { Album } from "src/albums/entities/album.entity";
import { Post } from "src/posts/entities/post.entity";

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: true})
    name: string;

    @Column({length: 255, nullable: true})
    username: string;

    @Column({length: 255, nullable: true, unique: true})
    email: string;

    @Column({length: 255, nullable: true})
    password?: string;

    @Column({length: 255, nullable: true})
    street?: string;

    @Column({length: 255, nullable: true})
    suite?: string;

    @Column({length: 255, nullable: true})
    city?: string;

    @Column({length: 255, nullable: true})
    zipcode?: string;

    @Column({type: 'decimal', precision: 9, scale: 6, nullable: true})
    lat?: number;

    @Column({type: 'decimal', precision: 9, scale: 6, nullable: true})
    lng?: number;

    @Column({length: 255, nullable: true})
    phone?: string;

    @Column({length: 255, nullable: true})
    website?: string;

    @Column({length: 255, nullable: true, name: 'company_name'})
    companyName?: string;

    @Column({length: 255, nullable: true, name: 'company_catchPhrase'})
    companyCatchPhrase?: string;

    @Column({length: 255, nullable: true, name: 'company_bs'})
    companyBs?: string;

    @OneToMany(() => Todo, (todo) => todo.user, {cascade: true})
    todos?: Todo[]

    @OneToMany(() => Album, (album) => album.user, {cascade: true})
    albums?: Album[]

    @OneToMany(() => Post, (post) => post.user, {cascade: true})
    posts?: Post[]
}

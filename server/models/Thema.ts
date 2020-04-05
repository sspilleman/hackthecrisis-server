import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";

@Entity()
export class Thema {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column({ nullable: false })
    thema: string;
}
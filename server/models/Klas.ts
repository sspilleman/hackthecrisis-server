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
export class Klas {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column({ nullable: false })
    klas: string;
}
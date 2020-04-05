import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Vak {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column({ nullable: false })
    vak: string;
}
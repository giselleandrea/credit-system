import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Plan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creditId: number;

    @Column()
    month: number;

    @Column('decimal')
    principal: number;

    @Column('decimal')
    interest: number;

    @Column('decimal')
    remainingBalance: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { CreditUser } from "./CreditUser";

@Entity()
export class Credit extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    amount: number;

    @Column()
    term: number;

    @Column('decimal')
    interestRate: number;

    @Column('decimal')
    monthlyIncome: number;

    @Column()
    status: string; // 'approved' | 'rejected' | 'revision' ;

    @OneToMany(() => CreditUser, (creditUser) => creditUser.user)
    creditUsers: CreditUser[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

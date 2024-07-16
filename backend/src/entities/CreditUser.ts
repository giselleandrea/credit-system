import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Credit } from "./Credit";

@Entity()
export class CreditUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.creditUsers)
    user: User;

    @ManyToOne(() => Credit, (credit) => credit.creditUsers)
    credit: Credit;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
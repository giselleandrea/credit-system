import { ObjectId } from 'mongodb';
import { 
    Entity, 
    ObjectIdColumn, 
    Column
} from "typeorm";

@Entity()
export class Plan {
    @ObjectIdColumn()
    id: number;

    @Column()
    creditId: number;

    @Column()
    paymentSchedule: Array<{
        month: number;
        principal: number;
        interest: number;
        remainingBalance: number;
    }>;
}
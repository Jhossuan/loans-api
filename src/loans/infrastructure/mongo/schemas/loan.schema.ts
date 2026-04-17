import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import {LoanStatus} from "../../../domain/loan.interfaces";

@Schema({ timestamps: true, collection: 'loans' })
export class Loan {

    @Prop({ type: String })
    loanId!: string;

    @Prop({ type: String })
    userId!: string;

    @Prop({ type: String })
    customerId!: string;

    @Prop({ type: Number })
    amount!: number;

    @Prop({ type: Number })
    interest!: number;

    @Prop({ type: Number })
    term!: number;

    @Prop({ type: Date })
    paymentDate!: Date;

    @Prop({ enum: LoanStatus, default: LoanStatus.PENDING })
    status!: LoanStatus;

    @Prop() createdAt?: Date;
    @Prop() updatedAt?: Date;

}

const LoanSchema = SchemaFactory.createForClass(Loan);

LoanSchema.pre('save', function () {
    this.loanId = uuidv4();
});

export { LoanSchema }
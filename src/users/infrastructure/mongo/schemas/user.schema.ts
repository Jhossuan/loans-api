import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true, collection: 'users' })
export class User {

    @Prop({ type: String })
    userId!: string;
    
    @Prop({ required: true, type: Boolean, default: true })
    visible!: boolean;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true, type: String })
    name!: string;

    @Prop({ required: true, type: String })
    password!: string;

}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function () {
    this.userId = uuidv4();
});

export { UserSchema }
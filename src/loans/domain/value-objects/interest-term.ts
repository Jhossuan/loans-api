import {AppError} from "../../../common/errors/app-error";

export class InterestTerm {

    private constructor(
        private readonly value: number,
    ) {
        this.value = value;
    }

    static create(value: number): InterestTerm {
        if(!value){
            throw new AppError("Interest term is required");
        }

        if(isNaN(value)){
            throw new AppError("Interest term must be a number");
        }

        if(value <= 0){
            throw new AppError("Interest term must be greater than 0");
        }

        if(!Number.isInteger(value)) {
            throw new AppError("Interest term should be an integer");
        }

        if(value > 50){
            throw new AppError("Interest term must be less than 50%");
        }

        return new InterestTerm(value);
    }

    public getValue(): number {
        return this.value;
    }

}
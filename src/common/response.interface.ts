import { HttpStatus } from "@nestjs/common"

export type ResponseI<T> = {
    data: T,
    status: HttpStatus,
    message: string,
    success: boolean,
} | {
    status: HttpStatus,
    message: string,
    success: boolean,
    error: any
}

export interface GetMetadataI {
    currentPage: number;
    lastPage: number;
    totalDocuments: number;
}
export interface TransactionType {
    userEmail: string;
    transactionType: string;
    os?: string;
    browser?: string;
    version?: string;
    device?: string;
    location: string;
    ip: string;
    datetime: string;

}
export type Increases = {
    id: number;
    description: string;
    date: Date;
    value: number;
    category_id: number;
}

export type Categories = {
    id: number;
    name: string;
    color: string;
}

export type Expenses = {
    id: number;
    description: string;
    date: Date;
    value: number;
    category_id: number;
}

export type Invests = {
    id: number;
    description: string;
    date: Date;
    value: number;
    goal: number;
    percentage: number;
}

export type Users = {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface Transactions extends Expenses, Increases {
    type: string;
}
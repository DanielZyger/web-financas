export type Increases = {
    id: number;
    description: string;
    date: Date;
    value: number;
}

export type Expenses = {
    id: number;
    description: string;
    date: Date;
    value: number;
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
    id: 3,
    name: string;
    email: string;
    password: string;
}
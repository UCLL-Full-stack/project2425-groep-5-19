


export type User = {
    firstName?: string;
    lastName?: string;
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
};
export type Unit = {
    id: number;
    name: string;
    type: string;
    attack: number;
    defense: number;
    hitpoints: number;
    cost: number;
};

export type Army = {
    id: number;
    name: string;
    userId: number;
    attack: number;
    defense: number;
    hitpoints: number;
    faction: string;
    units: Unit[];
};








export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

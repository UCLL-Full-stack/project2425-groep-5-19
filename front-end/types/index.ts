


export type User = {
    id: number;
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
    points: number;
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


export interface Complaint {
    id?: number;        
    message: string;
    userId: number;
}

export type ComplaintInput = {
    message: string; 
    userId: number;  
};





export type StatusMessage = {
    message: string;
    type: "error" | "success";
};



import { Complaint as ComplaintPrisma } from '@prisma/client';

export class Complaint {
    private id: number;
    private message: string;
    private userId: number;
    

    constructor(complaint: {
        id: number;
        message: string;
        userId: number;
        
    }) {
        this.id = complaint.id;
        this.message = complaint.message;
        this.userId = complaint.userId;
        
    }

    getId(): number  {
        return this.id;
    }

    getMessage(): string {
        return this.message;
    }

    getUserId(): number {
        return this.userId;
    }

    

    static from({ id, message, userId }: ComplaintPrisma): Complaint {
        return new Complaint({ id, message, userId });
    }
}

import { Complaint } from '../model/complaint';
import database from './prisma/database';


const getAllComplaints = async (): Promise<Complaint[]> => {
    try {
        const complaintsPrisma = await database.complaint.findMany();
        return complaintsPrisma.map((complaintPrisma) => Complaint.from(complaintPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getComplaintById = async ({ id }: { id: number }): Promise<Complaint | null> => {
    try {
        const complaintPrisma = await database.complaint.findUnique({
            where: { id },
        });

        if (!complaintPrisma) return null;
        return Complaint.from(complaintPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const createComplaint = async (complaint: Complaint): Promise<Complaint> => {
    try {
        const complaintPrisma = await database.complaint.create({
            data: {
                message: complaint.getMessage(),
                userId: complaint.getUserId(),
            },
        });

        return Complaint.from(complaintPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const deleteComplaintById = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.complaint.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    deleteComplaintById,
};

import complaintDB from '../repository/complaint.db';
import { Complaint } from '../model/complaint';


const getAllComplaints = async (): Promise<Complaint[]> => {
    return await complaintDB.getAllComplaints();
};


const getComplaintById = async ({ id }: { id: number }): Promise<Complaint> => {
    const complaint = await complaintDB.getComplaintById({ id });
    if (!complaint) {
        throw new Error(`Complaint with ID: ${id} does not exist.`);
    }
    return complaint;
};


const createComplaint = async ({
    message,
    userId,
}: {
    message: string;
    userId: number;
}): Promise<Complaint> => {
    const complaint = new Complaint({ message, userId }); 
    return await complaintDB.createComplaint(complaint);
};


const deleteComplaintById = async ({ id }: { id: number }): Promise<void> => {
    await getComplaintById({ id }); 
    await complaintDB.deleteComplaintById({ id });
};

export default {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    deleteComplaintById,
};

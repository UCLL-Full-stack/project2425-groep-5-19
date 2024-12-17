import { ComplaintInput } from "@types";

const getAllComplaints = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/complaints", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const getComplaintById = (complaintId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/complaints/${complaintId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const createComplaint = async (complaintData: ComplaintInput) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/complaints/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
        },
        body: JSON.stringify(complaintData),
    });

    if (!response.ok) {
        throw new Error("Failed to create complaint");
    }

    return await response.json();
};

const ComplaintService = {
    getAllComplaints,
    getComplaintById,
    createComplaint
};

export default ComplaintService;

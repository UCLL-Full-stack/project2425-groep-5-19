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

const ComplaintService = {
    getAllComplaints,
    getComplaintById,
};

export default ComplaintService;

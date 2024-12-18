import { ComplaintInput } from "@types";
const getToken = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const token = JSON.parse(loggedInUser)?.token;
      return token;
    } else {
      console.error("User not logged in or no token found");
      return null;
    }
  };


const getAllComplaints = () => {

    const token = getToken();
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/complaints", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
};

const getComplaintById = (complaintId: string) => {
    const token = getToken();
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/complaints/${complaintId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
};

const createComplaint = async (complaintData: ComplaintInput) => {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/complaints/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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

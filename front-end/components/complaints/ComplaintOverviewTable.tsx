import React, { useEffect, useState } from "react";
import { Complaint, User } from "@types";
import UserService from "@services/UserService";

type Props = {
    complaints: Array<Complaint>;
    selectComplaint: (complaint: Complaint) => void;
    removeComplaint: (complaintId: number) => void;
};

const ComplaintOverviewTable: React.FC<Props> = ({ complaints, selectComplaint, removeComplaint }: Props) => {
    const [users, setUsers] = useState<{ [userId: number]: User }>({});

    const getUserName = async (userId: number) => {
        if (users[userId]) return;

        try {
            const user = await UserService.getUserById(userId);
            setUsers((prev) => ({ ...prev, [userId]: user }));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await UserService.deleteUser(userId);
            removeComplaint(userId); // Notify parent to refresh complaints
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        complaints.forEach((complaint) => {
            getUserName(complaint.userId);
        });
    }, [complaints]);

    return (
        <table className="text-left w-full">
            <thead>
                <tr>
                    <th className="border px-4 py-2">Message</th>
                    <th className="border px-4 py-2">User Name</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {complaints.map((complaint, index) => (
                    <tr
                        key={index}
                        onClick={() => selectComplaint(complaint)}
                        className="cursor-pointer hover:bg-gray-200"
                    >
                        <td className="border px-4 py-2">{complaint.message}</td>
                        <td className="border px-4 py-2">
                            {users[complaint.userId]
                                ? `${users[complaint.userId].firstName} ${users[complaint.userId].lastName}`
                                : "Loading..."}
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteUser(complaint.userId);
                                }}
                                className="text-red-500 ml-2"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ComplaintOverviewTable;







import React, { useEffect, useState } from "react";
import { Complaint, User } from "@types";
import UserService from "@services/UserService";
import { useTranslation } from "next-i18next";

type Props = {
    complaints: Array<Complaint>;
    selectComplaint: (complaint: Complaint) => void;
    removeComplaint: (complaintId: number) => void;
};

const ComplaintOverviewTable: React.FC<Props> = ({ complaints, selectComplaint, removeComplaint }) => {
    const [users, setUsers] = useState<{ [userId: number]: User }>({});
    const { t } = useTranslation();


    const getUserName = async (userId: number) => {
        if (users[userId]) return;

        try {
            const user = await UserService.getUserById(userId);
            setUsers((prev) => ({ ...prev, [userId]: user }));
        } catch (error) {
            console.error(t("complaints.errors.fetchUser"), error);
        }
    };


    useEffect(() => {
        complaints.forEach((complaint) => {
            getUserName(complaint.userId);
        });
    }, [complaints]);


    const handleDeleteUser = async (userId: number) => {
        try {
            await UserService.deleteUser(userId);

            removeComplaint(userId);
            setUsers((prevUsers) => {
                const newUsers = { ...prevUsers };
                delete newUsers[userId];
                return newUsers;
            });
        } catch (error) {
            console.error(t("complaints.errors.deleteUser"), error);
        }
    };

    return (
        <table className="text-left w-full">
            <thead>
                <tr>
                    <th className="border px-4 py-2">{t("complaints.table.message")}</th>
                    <th className="border px-4 py-2">{t("complaints.table.userName")}</th>
                    <th className="border px-4 py-2">{t("complaints.table.actions")}</th>
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
                                : t("complaints.table.loading")}
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteUser(complaint.userId);
                                }}
                                className="text-red-500 ml-2"
                            >
                                {t("complaints.table.delete")}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ComplaintOverviewTable;












import React, { useState } from "react";
import { User } from "@types";
import ComplaintForm from "../complaints/ComplaintForm";
import { useTranslation } from "next-i18next";
import ComplaintService from "@services/ComplaintService";

type Props = {
    users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
    const { t } = useTranslation();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [message, setMessage] = useState("");

    const handleComplaintSubmit = async (message: string, userId: number) => {
        try {
            await ComplaintService.createComplaint({ message, userId });
            alert(t("user.success"));
            setSelectedUser(null);
            setMessage("");
        } catch (error) {
            alert(t("user.errors.submitFailed"));
            console.error(error);
        }
    };

    const handleCancelComplaintForm = () => {
        setSelectedUser(null);
    };

    return (
        <div>
            <table className="text-left border-collapse w-full mt-5">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">{t("userOverview.table.name")}</th>
                        <th className="border px-4 py-2">{t("userOverview.table.email")}</th>
                        <th className="border px-4 py-2">{t("userOverview.table.actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-200">
                            <td className="border px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    {t("userOverview.actions.makeComplaint")}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render ComplaintForm when a user is selected */}
            {selectedUser && (
                <ComplaintForm
                    user={selectedUser}
                    onSubmit={handleComplaintSubmit}
                    onCancel={handleCancelComplaintForm}
                />
            )}
        </div>
    );
};

export default UserOverviewTable;




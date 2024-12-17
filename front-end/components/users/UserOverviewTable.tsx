import React, { useState } from "react";
import { User } from "@types";
import ComplaintService from "@services/ComplaintService";
import { useTranslation } from "react-i18next"; // Import translation hook

type Props = {
    users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
    const { t } = useTranslation(); // Initialize translation function
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [message, setMessage] = useState("");

    const openComplaintForm = (user: User) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleComplaintSubmit = async () => {
        if (!selectedUser || selectedUser.id === undefined) {
            alert(t("complaint.errors.invalidUserId")); // Use translation
            return;
        }

        try {
            await ComplaintService.createComplaint({
                message,
                userId: selectedUser.id,
            });
            alert(t("complaint.success")); // Use translation
            setIsFormOpen(false);
            setMessage("");
        } catch (error) {
            alert(t("complaint.errors.submitFailed")); // Use translation
            console.error(error);
        }
    };

    return (
        <div>
            <table className="text-left border-collapse w-full mt-5">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">{t("userOverview.table.name")}</th> {/* Translated */}
                        <th className="border px-4 py-2">{t("userOverview.table.email")}</th> {/* Translated */}
                        <th className="border px-4 py-2">{t("userOverview.table.actions")}</th> {/* Translated */}
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
                                    onClick={() => openComplaintForm(user)}
                                >
                                    {t("userOverview.actions.makeComplaint")} {/* Translated */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Complaint Form Modal */}
            {isFormOpen && selectedUser && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-3">{t("complaint.form.title")}</h2> {/* Translated */}
                        <p className="mb-2">
                            {t("complaint.form.for")}{" "}
                            <strong>{`${selectedUser.firstName} ${selectedUser.lastName}`}</strong>
                        </p>
                        <textarea
                            className="w-full border rounded p-2 mb-3"
                            placeholder={t("complaint.form.placeholder")} // Translated
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                                onClick={() => setIsFormOpen(false)}
                            >
                                {t("general.cancel")} {/* Translated */}
                            </button>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={handleComplaintSubmit}
                            >
                                {t("general.submit")} {/* Translated */}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserOverviewTable;



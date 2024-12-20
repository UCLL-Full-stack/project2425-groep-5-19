// components/users/ComplaintForm.tsx

import React, { useState } from "react";
import { useTranslation } from "next-i18next";

type Props = {
    user: { firstName: string; lastName: string; email: string; id: number };
    onSubmit: (message: string, userId: number) => void;
    onCancel: () => void;
};

const ComplaintForm: React.FC<Props> = ({ user, onSubmit, onCancel }) => {
    const { t } = useTranslation();
    const [message, setMessage] = useState("");

    const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSubmit(message, user.id);
        }
    };

    return (
        <section className="mt-5 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center">{t("complaint.form.title")}</h2>
            <p className="mb-4">
                {t("complaint.form.for")} <strong>{`${user.firstName} ${user.lastName}`}</strong>
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    className="w-full border rounded p-2 mb-3"
                    placeholder={t("complaint.form.placeholder")}
                    value={message}
                    onChange={handleFormChange}
                />
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={onCancel}
                    >
                        {t("general.cancel")}
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                        {t("general.submit")}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ComplaintForm;

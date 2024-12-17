import { useState } from "react";
import { useRouter } from "next/router";
import ArmyService from "@services/ArmyService";
import { useTranslation } from "next-i18next";

const CreateArmyForm: React.FC = () => {
    const [name, setName] = useState("");
    const [faction, setFaction] = useState<"Imperium" | "Chaos">("Imperium");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const loggedInUser = localStorage.getItem("loggedInUser");
            if (!loggedInUser) {
                setError(t("createArmy.errors.noUser"));
                return;
            }

            const { id } = JSON.parse(loggedInUser);

            const response = await ArmyService.createArmy({ name, faction, userId: id });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || t("createArmy.errors.generic"));
                return;
            }

            const newArmy = await response.json();
            router.push(`/army/${newArmy.id}`);
        } catch (err) {
            setError(t("createArmy.errors.server"));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                    {t("createArmy.form.name")}
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="faction" className="block text-gray-700">
                    {t("createArmy.form.faction")}
                </label>
                <select
                    id="faction"
                    value={faction}
                    onChange={(e) => setFaction(e.target.value as "Imperium" | "Chaos")}
                    className="w-full p-2 border rounded"
                >
                    <option value="Imperium">{t("createArmy.form.factions.imperium")}</option>
                    <option value="Chaos">{t("createArmy.form.factions.chaos")}</option>
                </select>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {t("createArmy.form.submit")}
            </button>
        </form>
    );
};

export default CreateArmyForm;



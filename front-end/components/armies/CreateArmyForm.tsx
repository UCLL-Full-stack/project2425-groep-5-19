import { useState } from "react";
import { useRouter } from "next/router";
import ArmyService from "@services/ArmyService";

const CreateArmyForm: React.FC = () => {
    const [name, setName] = useState("");
    const [faction, setFaction] = useState<"Imperium" | "Chaos">("Imperium");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const loggedInUser = localStorage.getItem("loggedInUser");
            if (!loggedInUser) {
                setError("No logged-in user found.");
                return;
            }

            const { id } = JSON.parse(loggedInUser);

            const response = await ArmyService.createArmy({ name, faction, userId: id });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Failed to create army.");
                return;
            }

            const newArmy = await response.json();

            // Redirect to the dynamically generated page
            router.push(`/army/${newArmy.id}`);
        } catch (err) {
            setError("An error occurred while creating the army.");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-4">Create Army</h1>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Army Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border rounded-lg p-2 w-full"
                        placeholder="Enter army name"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Faction
                    </label>
                    <select
                        value={faction}
                        onChange={(e) => setFaction(e.target.value as "Imperium" | "Chaos")}
                        className="border rounded-lg p-2 w-full"
                    >
                        <option value="Imperium">Imperium</option>
                        <option value="Chaos">Chaos</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Create Army
                </button>
            </form>
        </div>
    );
};

export default CreateArmyForm;

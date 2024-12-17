import React from "react";
import { Army } from "@types";
import { useRouter } from "next/router";

type Props = {
    armies: Array<Army>;
    selectArmy: (army: Army) => void;
};

const ArmyOverviewTable: React.FC<Props> = ({
    armies,
    selectArmy,
}: Props) => {
    const router = useRouter();

    const handleModifyClick = (armyID: number) => {
        router.push(`/army/${armyID}`);
    };

    return (
        <>
            {armies && (
                <table className="text-left border-collapse w-full mt-5">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Army Name</th>
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Attack</th>
                            <th className="border px-4 py-2">Defense</th>
                            <th className="border px-4 py-2">Hitpoints</th>
                            <th className="border px-4 py-2">Faction</th>
                            <th className="border px-4 py-2">Actions</th> {/* New column */}
                        </tr>
                    </thead>
                    <tbody>
                        {armies.map((army, index) => (
                            <tr
                                key={index}
                                onClick={() => selectArmy(army)}
                                className="hover:bg-gray-200 cursor-pointer"
                            >
                                <td className="border px-4 py-2">{army.name}</td>
                                <td className="border px-4 py-2">{army.userId}</td>
                                <td className="border px-4 py-2">{army.attack}</td>
                                <td className="border px-4 py-2">{army.defense}</td>
                                <td className="border px-4 py-2">{army.hitpoints}</td>
                                <td className="border px-4 py-2">{army.faction}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click event
                                            handleModifyClick(army.id);
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Modify
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ArmyOverviewTable;


import React from "react";
import { Unit } from "@types";

type Props = {
    units: Array<Unit>;
    onAddUnit: (unit: Unit) => void;
    onRemoveUnit: (unit: Unit) => void;
    armyUnits: number[];
};

const UnitOverviewTableMod: React.FC<Props> = ({ units, onAddUnit, onRemoveUnit, armyUnits }) => {
    return (
        <>
            {units && (
                <table className="text-left border-collapse w-full mt-5">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Unit Name</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Attack</th>
                            <th className="border px-4 py-2">Defense</th>
                            <th className="border px-4 py-2">Hitpoints</th>
                            <th className="border px-4 py-2">Cost</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit) => (
                            <tr
                                key={unit.id}
                                className="hover:bg-gray-200"
                            >
                                <td className="border px-4 py-2">{unit.name}</td>
                                <td className="border px-4 py-2">{unit.type}</td>
                                <td className="border px-4 py-2">{unit.attack}</td>
                                <td className="border px-4 py-2">{unit.defense}</td>
                                <td className="border px-4 py-2">{unit.hitpoints}</td>
                                <td className="border px-4 py-2">{unit.points}</td>
                                <td className="border px-4 py-2">
                                    {armyUnits.includes(unit.id) ? (
                                        <button
                                            onClick={() => onRemoveUnit(unit)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onAddUnit(unit)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Add
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UnitOverviewTableMod;

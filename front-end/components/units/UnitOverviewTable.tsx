import React from "react";
import { Unit } from "@types";

type Props = {
    units: Array<Unit>;
    onUnitClick: (unit: Unit) => void; // Callback for unit click
};

const UnitOverviewTable: React.FC<Props> = ({ units, onUnitClick }: Props) => {
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
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-200 cursor-pointer"
                                onClick={() => onUnitClick(unit)} // Call parent callback
                            >
                                <td className="border px-4 py-2">{unit.name}</td>
                                <td className="border px-4 py-2">{unit.type}</td>
                                <td className="border px-4 py-2">{unit.attack}</td>
                                <td className="border px-4 py-2">{unit.defense}</td>
                                <td className="border px-4 py-2">{unit.hitpoints}</td>
                                <td className="border px-4 py-2">{unit.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UnitOverviewTable;


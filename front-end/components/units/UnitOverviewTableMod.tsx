import React from "react";
import { Unit } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
    units: Array<Unit>;
    onAddUnit: (unit: Unit) => void;
    onRemoveUnit: (unit: Unit) => void;
    armyUnits: number[];
};

const UnitOverviewTableMod: React.FC<Props> = ({ units, onAddUnit, onRemoveUnit, armyUnits }) => {
    const { t } = useTranslation();

    return (
        <>
            {units && (
                <table className="text-left border-collapse w-full mt-5">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">{t("unit.table.name")}</th>
                            <th className="border px-4 py-2">{t("unit.table.type")}</th>
                            <th className="border px-4 py-2">{t("unit.table.attack")}</th>
                            <th className="border px-4 py-2">{t("unit.table.defense")}</th>
                            <th className="border px-4 py-2">{t("unit.table.hitpoints")}</th>
                            <th className="border px-4 py-2">{t("unit.table.cost")}</th>
                            <th className="border px-4 py-2">{t("unit.table.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit) => (
                            <tr key={unit.id} className="hover:bg-gray-200">
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
                                            {t("unit.table.remove")}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onAddUnit(unit)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            {t("unit.table.add")}
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


import React from "react";
import { Unit } from "@types";
import { useTranslation } from "next-i18next";

type Props = {
    units: Array<Unit>;
    onUnitClick: (unit: Unit) => void;
};

const UnitOverviewTable: React.FC<Props> = ({ units, onUnitClick }: Props) => {
    const { t } = useTranslation("common");

    return (
        <>
            {units && (
                <table className="text-left border-collapse w-full mt-5">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">{t("unit.table.name")}</th>

                            <th className="border px-4 py-2">{t("unit.table.attack")}</th>
                            <th className="border px-4 py-2">{t("unit.table.defense")}</th>
                            <th className="border px-4 py-2">{t("unit.table.hitpoints")}</th>
                            <th className="border px-4 py-2">{t("unit.table.cost")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-200 cursor-pointer"
                                onClick={() => onUnitClick(unit)}
                            >
                                <td className="border px-4 py-2">{unit.name}</td>

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



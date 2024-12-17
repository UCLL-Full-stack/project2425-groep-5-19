import React from "react";
import { Army } from "@types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Props = {
    armies: Array<Army>;
    selectArmy: (army: Army) => void;
};

const ArmyOverviewTable: React.FC<Props> = ({
    armies,
    selectArmy,
}: Props) => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleModifyClick = (armyID: number) => {
        router.push(`/army/${armyID}`);
    };

    return (
        <>
            {armies && (
                <table className="text-left border-collapse w-full mt-5">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">{t("army.table.name")}</th>
                            <th className="border px-4 py-2">{t("army.table.userId")}</th>
                            <th className="border px-4 py-2">{t("army.table.attack")}</th>
                            <th className="border px-4 py-2">{t("army.table.defense")}</th>
                            <th className="border px-4 py-2">{t("army.table.hitpoints")}</th>
                            <th className="border px-4 py-2">{t("army.table.faction")}</th>
                            <th className="border px-4 py-2">{t("army.table.actions")}</th> {/* New column */}
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
                                        {t("army.table.modify")}
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



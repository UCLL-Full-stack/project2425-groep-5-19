import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import ArmyService from "@services/ArmyService";
import ArmyOverviewTable from "@components/armies/ArmyOverviewTable";
import UnitOverviewTable from "@components/units/UnitOverviewTable";
import { Army, Unit } from "@types";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Armies: React.FC = () => {
    const { t } = useTranslation("common");
    const [armies, setArmies] = useState<Array<Army>>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedArmy, setSelectedArmy] = useState<Army | null>(null);

    const getArmies = async () => {
        setError(null);
        try {
            const armies = await ArmyService.getAllArmies();
            setArmies(armies);
        } catch (err: any) {
            setError(err.message);
        }
    };


    const handleUnitClick = (unit: Unit) => {
        console.log(t("armies.unitClicked"), unit);
    };

    useEffect(() => {
        getArmies();
    }, []);

    return (
        <>
            <Head>
                <title>{t("armies.title")}</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">{t("armies.heading")}</h1>
                <section>
                    {/* Error Handling */}
                    {error && <div className="text-red-800">{error}</div>}

                    {/* Army Overview Table */}
                    {armies.length > 0 ? (
                        <ArmyOverviewTable
                            armies={armies}
                            selectArmy={setSelectedArmy}
                        />
                    ) : (
                        !error && (
                            <div className="text-gray-600">{t("armies.noArmies")}</div>
                        )
                    )}
                </section>

                {/* Selected Army Details */}
                {selectedArmy && (
                    <section className="mt-5">
                        <h2 className="text-2xl font-semibold text-center">
                            {t("armies.unitsInArmy", { armyName: selectedArmy.name })}
                        </h2>

                        {selectedArmy.units && selectedArmy.units.length > 0 ? (
                            <UnitOverviewTable
                                units={selectedArmy.units}
                                onUnitClick={handleUnitClick}
                            />
                        ) : (
                            <div className="text-gray-600">
                                {t("armies.noUnits")}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Armies;




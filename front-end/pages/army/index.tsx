import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import ArmyService from "@services/ArmyService";
import ArmyOverviewTable from "@components/armies/ArmyOverviewTable";
import UnitOverviewTable from "@components/units/UnitOverviewTable";
import { Army } from "@types";

const Armies: React.FC = () => {
    const [armies, setArmies] = useState<Array<Army>>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedArmy, setSelectedArmy] = useState<Army | null>(null);


    const getArmies = async () => {
        setError("");
        const response = await ArmyService.getAllArmies();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const armies = await response.json();
            setArmies(armies);
        }



    }

    useEffect(() => {
        getArmies();
    }, []);

    return (
        <>
            <Head>
                <title>Armies</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Armies</h1>
                <section>
                    {/* Error Handling */}
                    {error && <div className="text-red-800">{error}</div>}

                    {/* Army Overview Table */}
                    {armies.length > 0 && (
                        <ArmyOverviewTable
                            armies={armies}
                            selectArmy={setSelectedArmy}
                        />
                    )}

                    {armies.length === 0 && !error && (
                        <div className="text-gray-600">No armies available.</div>
                    )}
                </section>

                {/* Selected Army Details */}
                {selectedArmy && (
                    <section className="mt-5">
                        <h2 className="text-2xl font-semibold text-center">
                            Units in {selectedArmy.name}
                        </h2>

                        {selectedArmy.units && selectedArmy.units.length > 0 ? (
                            <UnitOverviewTable units={selectedArmy.units} />
                        ) : (
                            <div className="text-gray-600">
                                No units assigned to this army.
                            </div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
};

export default Armies;


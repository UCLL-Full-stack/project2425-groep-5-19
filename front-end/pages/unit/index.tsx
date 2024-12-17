import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import UnitOverviewTable from "@components/units/UnitOverviewTable";
import UnitService from "@services/UnitService";
import { Unit } from "@types";

const Units: React.FC = () => {
    const [units, setUnits] = useState<Array<Unit>>([]);
    const [error, setError] = useState<string | null>(null);

    const getUnits = async () => {
        setError("");
        const response = await UnitService.getAllUnits();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const units = await response.json();
            setUnits(units);
        }
    };

    useEffect(() => {
        getUnits();
    }, []);

    return (
        <>
            <Head>
                <title>Units</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Units</h1>
                <section>
                    {/* Error Handling */}
                    {error && <div className="text-red-800">{error}</div>}

                    {/* Unit Overview Table */}
                    {units.length > 0 && <UnitOverviewTable units={units} />}

                    {units.length === 0 && !error && (
                        <div className="text-gray-600">No units available.</div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Units;

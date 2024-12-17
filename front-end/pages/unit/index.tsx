import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import UnitOverviewTable from "@components/units/UnitOverviewTable";
import UnitStatsForm from "@components/units/UnitStatsForm";
import UnitService from "@services/UnitService";
import { Unit } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Units: React.FC = () => {
    const [units, setUnits] = useState<Array<Unit>>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [formValues, setFormValues] = useState({
        attack: 0,
        defense: 0,
        hitpoints: 0,
        points: 0,
    });

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

    const handleUnitClick = (unit: Unit) => {
        setSelectedUnit(unit);
        setFormValues({
            attack: unit.attack,
            defense: unit.defense,
            hitpoints: unit.hitpoints,
            points: unit.points,
        });
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUnit) return;

        try {
            const response = await UnitService.updateUnitStats(selectedUnit.id, formValues);

            if (response.ok) {
                const updatedUnit = await response.json();
                setUnits((prevUnits) =>
                    prevUnits.map((unit) =>
                        unit.id === updatedUnit.id ? updatedUnit : unit
                    )
                );
                setSelectedUnit(null); // Close the form
            } else {
                setError("Failed to update unit stats.");
            }
        } catch (error) {
            setError("An error occurred while updating unit stats.");
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
                    {units.length > 0 && (
                        <UnitOverviewTable
                            units={units}
                            onUnitClick={handleUnitClick}
                        />
                    )}

                    {units.length === 0 && !error && (
                        <div className="text-gray-600">No units available.</div>
                    )}
                </section>

                {/* Selected Unit Form */}
                {selectedUnit && (
                    <UnitStatsForm
                        unitName={selectedUnit.name}
                        formValues={formValues}
                        onFormChange={handleFormChange}
                        onSubmit={handleSubmit}
                    />
                )}
            </main>
        </>
    );
};




export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        }
    }
}

export default Units;


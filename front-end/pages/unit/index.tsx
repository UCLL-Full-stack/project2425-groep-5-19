import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "@components/header";
import UnitOverviewTable from "@components/units/UnitOverviewTable";
import UnitStatsForm from "@components/units/UnitStatsForm";
import UnitService from "@services/UnitService";
import { Unit } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Units: React.FC = () => {
    const { t } = useTranslation("common");

    const [units, setUnits] = useState<Array<Unit>>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [formValues, setFormValues] = useState({
        attack: 0,
        defense: 0,
        hitpoints: 0,
        points: 0,
    });

    const [loggedInUser, setLoggedInUser] = useState<any | null>(null); // State to store logged-in user

    // Retrieve logged-in user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setLoggedInUser(parsedUser);
            } catch (error) {
                console.error("Error parsing loggedInUser from localStorage:", error);
            }
        }
    }, []);

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
                setSelectedUnit(null);
            } else {
                setError(t("failedToUpdateStats"));
            }
        } catch (error) {
            setError(t("errorOccurred"));
        }
    };

    useEffect(() => {
        getUnits();
    }, []);

    const isAdmin = loggedInUser?.role === "admin"; // Check if the logged-in user is an admin

    return (
        <>
            <Head>
                <title>{t("unitsTitle")}</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">{t("unitsTitle")}</h1>
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
                        <div className="text-gray-600">{t("noUnitsAvailable")}</div>
                    )}
                </section>

                {/* Show Unit Stats Form only if user is admin */}
                {isAdmin && selectedUnit && (
                    <UnitStatsForm
                        unitName={t("updateStatsFor", { unitName: selectedUnit.name })}
                        formValues={formValues}
                        onFormChange={handleFormChange}
                        onSubmit={handleSubmit}
                    />
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

export default Units;




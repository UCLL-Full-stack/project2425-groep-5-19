import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@components/header";
import UnitOverviewTableMod from "@components/units/UnitOverviewTableMod";
import ArmyService from "@services/ArmyService";
import { Army, Unit } from "@types";
import UnitService from "@services/UnitService";
const ArmyDetailPage: React.FC = () => {
    const router = useRouter();
    const { armyID } = router.query;
    const [army, setArmy] = useState<Army | null>(null);
    const [units, setUnits] = useState<Array<Unit>>([]);
    const [error, setError] = useState<string | null>(null);
    const fetchArmyDetails = async () => {
        try {
            if (typeof armyID !== "string") {
                setError("Invalid army ID.");
                return;
            }
            const response = await ArmyService.getArmyById(armyID);
            if (!response.ok) {
                setError("Failed to fetch army details.");
                return;
            }
            const fetchedArmy = await response.json();
            setArmy(fetchedArmy);
            const unitsResponse = await UnitService.getUnitsByFaction(fetchedArmy.faction);
            if (!unitsResponse.ok) {
                setError("Failed to fetch units for the faction.");
                return;
            }
            const fetchedUnits = await unitsResponse.json();
            setUnits(fetchedUnits);
        } catch (err) {
            setError("An error occurred while fetching army details.");
        }
    };
    useEffect(() => {
        if (armyID) {
            fetchArmyDetails();
        }
    }, [armyID]);
    const handleAddUnit = async (unit: Unit) => {
        if (!army || typeof armyID !== "string") return;

        try {
            const addedUnit = await UnitService.addUnitToArmy(unit.id, parseInt(armyID));

            setArmy((prevArmy) => {
                if (!prevArmy) return null;
                return {
                    ...prevArmy,
                    units: [...prevArmy.units, addedUnit],
                };
            });

            setError(null);
        } catch (err: any) {

            if (err.response) {
                try {
                    const errorData = await err.response.json();
                    setError(errorData.message || "An error occurred while adding the unit.");
                } catch (jsonErr) {
                    setError("Failed to parse error response.");
                }
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    const handleRemoveUnit = async (unit: Unit) => {
        if (!army || typeof armyID !== "string") return;
        try {
            const response = await UnitService.removeUnitFromArmy(unit.id, parseInt(armyID));
            if (!response.ok) {
                setError("Failed to remove unit from the army.");
                return;
            }

            setArmy((prevArmy) => {
                if (!prevArmy) return null;
                return {
                    ...prevArmy,
                    units: prevArmy.units.filter((u) => u.id !== unit.id),
                };
            });
        } catch (err) {
            setError("An error occurred while removing the unit.");
        }
    };
    return (
        <>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Army Details</h1>
                {error && <div className="text-red-600">{error}</div>}
                {army && (
                    <section className="w-full max-w-4xl">
                        <h2 className="text-2xl font-bold text-center mb-4">{army.name}</h2>
                        <p className="text-center mb-4">
                            <strong>Faction:</strong> {army.faction}
                        </p>
                        <h3 className="text-xl font-semibold mb-3">Units</h3>
                        {units.length > 0 ? (
                            <UnitOverviewTableMod
                                units={units}
                                onAddUnit={handleAddUnit}
                                onRemoveUnit={handleRemoveUnit}
                                armyUnits={army?.units?.map((u) => u.id) || []}
                            />
                        ) : (
                            <div className="text-gray-600">No units available for this faction.</div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
};
export default ArmyDetailPage;





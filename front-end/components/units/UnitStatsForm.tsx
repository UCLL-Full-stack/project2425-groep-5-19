import React from "react";

type FormValues = {
    attack: number;
    defense: number;
    hitpoints: number;
    points: number;
};

type Props = {
    unitName: string;
    formValues: FormValues;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const UnitStatsForm: React.FC<Props> = ({ unitName, formValues, onFormChange, onSubmit }) => {
    return (
        <section className="mt-5 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center">
                Update Stats for {unitName}
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
                <label>
                    Attack:
                    <input
                        type="number"
                        name="attack"
                        value={formValues.attack}
                        onChange={onFormChange}
                        className="border px-2 py-1 w-full"
                    />
                </label>
                <label>
                    Defense:
                    <input
                        type="number"
                        name="defense"
                        value={formValues.defense}
                        onChange={onFormChange}
                        className="border px-2 py-1 w-full"
                    />
                </label>
                <label>
                    Hitpoints:
                    <input
                        type="number"
                        name="hitpoints"
                        value={formValues.hitpoints}
                        onChange={onFormChange}
                        className="border px-2 py-1 w-full"
                    />
                </label>
                <label>
                    Points:
                    <input
                        type="number"
                        name="points"
                        value={formValues.points}
                        onChange={onFormChange}
                        className="border px-2 py-1 w-full"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                >
                    Update Stats
                </button>
            </form>
        </section>
    );
};

export default UnitStatsForm;

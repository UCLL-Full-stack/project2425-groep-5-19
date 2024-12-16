import unitDB from '../repository/unit.db'; 
import { UnitInput } from '../types'; 
import { Unit } from '../model/unit'; 


const getAllUnits = async (): Promise<Unit[]> => {
    return await unitDB.getAllUnits();
};


const getUnitById = async ({ id }: { id: number }): Promise<Unit> => {
    const unit = await unitDB.getAllUnits().then(units => units.find(u => u.getId() === id));
    if (!unit) {
        throw new Error(`Unit with ID: ${id} does not exist.`);
    }
    return unit;
};


const createUnit = async ({
    name,
    type,
    points,

    attack,
    defense,
    hitpoints,
    faction,
}: UnitInput): Promise<Unit> => {
    const unit = new Unit({ name, type, points, attack, defense, hitpoints, faction });
    return await unitDB.createUnit(unit);
};


const addUnitToArmy = async (unitId: number, armyId: number): Promise<Unit> => {
    const unit = await getUnitById({ id: unitId }); 
    return await unitDB.addUnitToArmy(unitId, armyId);
};


const removeUnitFromArmy = async (unitId: number, armyId: number): Promise<Unit> => {
    
    const unit = await getUnitById({ id: unitId });
    return await unitDB.removeUnitFromArmy(unitId, armyId);
};


const updateUnitStats = async (
    unitId: number,
    updatedStats: { attack?: number; defense?: number; hitpoints?: number; points?: number }
): Promise<Unit> => {
    const unit = await getUnitById({ id: unitId }); 
    return await unitDB.updateUnitStats(unitId, updatedStats);
};

export default {
    getAllUnits,
    getUnitById,
    createUnit,
    addUnitToArmy,
    removeUnitFromArmy,
    updateUnitStats,
};

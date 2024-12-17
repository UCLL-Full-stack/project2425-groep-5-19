import unitDB from '../repository/unit.db'; 
import { Faction, UnitInput } from '../types'; 
import { Unit } from '../model/unit'; 
import armyService from '../service/army.service';


const getAllUnits = async (): Promise<Unit[]> => {
    return await unitDB.getAllUnits();
};
const getUnitsByFaction = async (faction: Faction): Promise<Unit[]> => {
    return await unitDB.getUnitsByFaction(faction);
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
    if (!unit) {
        throw new Error("Unit not found.");
    }

    
    const army = await armyService.getArmyById({id: armyId}); 
    if (!army) {
        throw new Error("Army not found.");
    }

   
    const currentTotalCost = army.getUnits().reduce((total: number, armyUnit: Unit) => total + armyUnit.getPoints(), 0);

    
    const newTotalCost = currentTotalCost + unit.getPoints();
    if (newTotalCost > 1000) {
        throw new Error("Adding this unit would exceed the army's total cost limit of 1000.");
    }

    
    const addedUnit = await unitDB.addUnitToArmy(unitId, armyId);

    
    await armyService.updateArmyStats(armyId);

    return addedUnit;
};





const removeUnitFromArmy = async (unitId: number, armyId: number): Promise<Unit> => {
    
    const unit = await getUnitById({ id: unitId });

    
    const removedUnit = await unitDB.removeUnitFromArmy(unitId, armyId);

    
    await armyService.updateArmyStats(armyId);

    
    return removedUnit;
};



const updateUnitStats = async (
    unitId: number,
    updatedStats: { attack?: number; defense?: number; hitpoints?: number; points?: number }
): Promise<Unit> => {
    
    const unit = await getUnitById({ id: unitId });
    
    
    const updatedUnit = await unitDB.updateUnitStats(unitId, updatedStats);

    
    const allArmies = await armyService.getAllArmies(); 

    
    await Promise.all(
        allArmies
            .filter(army => army.getId() !== undefined) 
            .map(army => armyService.updateArmyStats(army.getId()!)) 
    );

    return updatedUnit;
};


export default {
    getAllUnits,
    getUnitById,
    createUnit,
    addUnitToArmy,
    removeUnitFromArmy,
    updateUnitStats,
    getUnitsByFaction
};

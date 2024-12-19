import { Unit } from '../model/unit';
import { Faction } from '../types';
import database from './prisma/database';

const getAllUnits = async (): Promise<Unit[]> => {
    try {
        const unitsPrisma = await database.unit.findMany();
        return unitsPrisma.map((unitPrisma) => Unit.from(unitPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addUnitToArmy = async (unitId: number, armyId: number): Promise<Unit> => {
    try {
        const updatedArmy = await database.army.update({
            where: { id: armyId },
            data: {
                units: {
                    connect: { id: unitId }, 
                },
            },
            include: {
                units: true, 
            },
        });

        const connectedUnitData = updatedArmy.units.find((unit) => unit.id === unitId);
        if (!connectedUnitData) {
            throw new Error('Unit not properly connected to Army.');
        }

        
        return Unit.from(connectedUnitData);
    } catch (error) {
        console.error('Failed to add unit to army:', error);
        throw new Error('Database error. See server log for details.');
    }
};


const removeUnitFromArmy = async (unitId: number, armyId: number): Promise<Unit> => {
    try {
        const updatedArmy = await database.army.update({
            where: { id: armyId },
            data: {
                units: {
                    disconnect: { id: unitId }, 
                },
            },
            include: {
                units: true, 
            },
        });

        const disconnectedUnitData = updatedArmy.units.find((unit) => unit.id === unitId);
        if (disconnectedUnitData) {
            throw new Error('Unit was not properly removed from the Army.');
        }

        
        const unit = await database.unit.findUnique({
            where: { id: unitId },
        });

        if (!unit) {
            throw new Error('Unit not found after disconnection.');
        }

        return Unit.from(unit); 
    } catch (error) {
        console.error('Failed to remove unit from army:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUnitsByFaction = async (faction: Faction): Promise<Unit[]> => {
    try {
        
        const unitsPrisma = await database.unit.findMany({
            where: {
                faction: faction, 
            },
        });

        
        return unitsPrisma.map((unitPrisma) => Unit.from(unitPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};








const createUnit = async (unit: Unit): Promise<Unit> => {
    try {
        const newUnit = await database.unit.create({
            data: {
                name: unit.getName(),
                
                points: unit.getPoints(),
                
                attack: unit.getAttack(),
                defense: unit.getDefense(),
                hitpoints: unit.getHitpoints(),
                faction: unit.getFaction(),
            },
        });

        return Unit.from(newUnit);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const updateUnitStats = async (
    unitId: number,
    updatedStats: { attack?: number; defense?: number; hitpoints?: number; points?: number; }
): Promise<Unit> => {
    try {
        
        const updatedUnit = await database.unit.update({
            where: { id: unitId },
            data: updatedStats, 
        });

        
        return Unit.from(updatedUnit);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};









export default {
    createUnit,
    updateUnitStats,
    getAllUnits,
    addUnitToArmy,
    removeUnitFromArmy,
    getUnitsByFaction
};

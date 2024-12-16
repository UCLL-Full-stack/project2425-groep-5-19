import { Army } from '../model/army';
import database from './prisma/database';
import { Unit } from '../model/unit';

const getAllArmies = async (): Promise<Army[]> => {
    try {
        const armiesPrisma = await database.army.findMany({
            include: { units: true },
        });

        return armiesPrisma.map((armyPrisma) => {
            const units = armyPrisma.units.map((unit) => Unit.from(unit));
            return Army.from(armyPrisma, units);
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getArmyById = async ({ id }: { id: number }): Promise<Army | null> => {
    try {
        const armyPrisma = await database.army.findUnique({
            where: { id },
            include: { units: true },
        });

        if (!armyPrisma) return null;

        const units = armyPrisma.units.map((unit) => Unit.from(unit));
        return Army.from(armyPrisma, units);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createArmy = async (army: Army): Promise<Army> => {
    try {
        const armyPrisma = await database.army.create({
            data: {
                name: army.getName(),
                userId: army.getUserId(),
                attack: army.getAttack(),
                defense: army.getDefense(),
                hitpoints: army.getHitpoints(),
                maxCost: army.getMaxCost(),
                faction: army.getFaction(),
                
            },
        });

        
        return Army.from(armyPrisma, []);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteArmyById = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.army.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getArmiesByUserId = async ({ userId }: { userId: number }): Promise<Army[]> => {
    try {
        const armiesPrisma = await database.army.findMany({
            where: { userId },
            include: { units: true },
        });

        return armiesPrisma.map((armyPrisma) => {
            const units = armyPrisma.units.map((unit) => Unit.from(unit));
            return Army.from(armyPrisma, units);
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllArmies,
    getArmyById,
    createArmy,
    deleteArmyById,
    getArmiesByUserId,
};

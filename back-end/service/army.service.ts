import armyDB from '../repository/army.db';
import { ArmyInput } from '../types';
import { Army } from '../model/army';


const getAllArmies = async (): Promise<Army[]> => armyDB.getAllArmies();

const getArmyById = async ({ id }: { id: number }): Promise<Army> => {
    const army = await armyDB.getArmyById({ id });
    if (!army) {
        throw new Error(`Army with ID: ${id} does not exist.`);
    }
    return army;
};

const createArmy = async ({
    name,
    userId,

    maxCost,
    faction,
}: ArmyInput): Promise<Army> => {
    
    const army = new Army({ name, userId, maxCost, units: [], faction });
    return await armyDB.createArmy(army);
};

const deleteArmyById = async ({ id }: { id: number }): Promise<void> => {
    await getArmyById({ id }); 
    await armyDB.deleteArmyById({ id });
};

const getArmiesByUserId = async ({ userId }: { userId: number }): Promise<Army[]> => {
    const armies = await armyDB.getArmiesByUserId({ userId });
    if (!armies.length) {
        throw new Error(`No armies found for user with ID: ${userId}.`);
    }
    return armies;
};

export default {
    getAllArmies,
    getArmyById,
    createArmy,
    deleteArmyById,
    getArmiesByUserId,
};

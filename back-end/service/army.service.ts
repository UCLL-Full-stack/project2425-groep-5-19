import armyDB from '../repository/army.db';
import { ArmyInput } from '../types';
import { Army } from '../model/army';
import userService from './user.service';


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
    attack,
    defense,
    hitpoints,
    maxCost,
    faction,
}: ArmyInput): Promise<Army> => {

    const army = new Army({ name, userId, attack, defense, hitpoints, maxCost, units: [], faction });
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

const updateArmyStats = async (id: number): Promise<Army> => {
    
    const army = await getArmyById({ id });

    
    const newStats = {
        attack: army.getAttack(),
        defense: army.getDefense(),
        hitpoints: army.getHitpoints(),
        maxCost : army.getMaxCost(),
    };

    
    const updatedArmy = await armyDB.updateArmyStats(id, newStats);

    return updatedArmy;
};
const getArmiesByUser = async ({ username }: { username: string }): Promise<Army[]> => {
    
        
        const user = await userService.getUserByUsername({ username });
        const id = user.getId();
        
        if (!user || !id) {
            throw new Error(`User with username: ${username} does not exist or has no valid ID.`);
        }

        
        const armies = await armyDB.getArmiesByUserId({ userId: id });

        

        return armies;
     
};



export default {
    getAllArmies,
    getArmyById,
    createArmy,
    deleteArmyById,
    getArmiesByUserId,
    updateArmyStats, getArmiesByUser
};

import { User } from '../model/user';
import database from './prisma/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                password: user.getPassword(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



const deleteUserById = async ({ id }: { id: number }): Promise<void> => {
    try {
        
        await database.complaint.deleteMany({
            where: {
                userId: id, 
            },
        });

        
        await database.army.deleteMany({
            where: {
                userId: id, 
            },
        });

        
        await database.user.delete({
            where: {
                id: id, 
            },
        });
    } catch (error) {
        console.error("Error deleting user or complaints:", error);
        throw new Error("Failed to delete user or related complaints.");
    }
};



export default {
    deleteUserById,
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsername,
};

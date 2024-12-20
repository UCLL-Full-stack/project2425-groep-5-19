import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
   

    const user = await userDB.getUserByUsername({ username });
    
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    console.log({ username, password })
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        
        throw new Error('Incorrect password.');
    }

    const userId = user.getId();
    if (userId === undefined) {
        throw new Error('User ID is missing.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
        id: userId,
    };
};

const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, firstName, lastName, email, role });

    return await userDB.createUser(user);
};




const getUserById = async ({ id }: { id: number }): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error(`User with ID: ${id} does not exist.`);
    }
    return user;
};



const deleteUser = async ({ id }: { id: number }): Promise<void> => {
    await getUserById({ id }); 
    await userDB.deleteUserById({ id });
};




export default { getUserByUsername, authenticate, createUser, getAllUsers, getUserById, deleteUser };

import { User } from "@types";

const loginUser = (user: User) => {
    console.log(user)
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};





const getUserById = async (userId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    const user = await response.json();
    return user; 
};

const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust token if necessary
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete the user');
    }
};

const getAllUsers = async (): Promise<Array<User>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (!response.ok) {
        throw new Error("Failed to fetch all users");
    }
    return response.json();
};

const UserService = {
    loginUser,
    getUserById, deleteUser
    , getAllUsers
};


export default UserService;

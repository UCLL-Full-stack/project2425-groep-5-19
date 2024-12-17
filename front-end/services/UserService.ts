import { User } from "@types";

const loginUser = (user: User) => {
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

const UserService = {
    loginUser,
    getUserById
};


export default UserService;

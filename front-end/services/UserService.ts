import { User } from "@types";
const getToken = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const token = JSON.parse(loggedInUser)?.token;
      return token;
    } else {
      console.error("User not logged in or no token found");
      return null;
    }
  };


const loginUser = (user: User) => {
    
    
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};





const getUserById = async (userId: number): Promise<User> => {

    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    const user = await response.json();
    return user;
};


const getAllUsers = async (): Promise<Array<User>> => {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all users");
    }

    return response.json();
};

const deleteUser = async (id: number): Promise<void> => {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete the user');
    }
};



const UserService = {
    loginUser,
    getUserById, deleteUser
    , getAllUsers
};


export default UserService;

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

const getAllArmies = () => {
  const token = getToken();

  
  if (token) {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/armies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  } else {
    
    throw new Error("Token is missing. Please log in first.");
  }
};

  



const getArmyById = (armyId: string) => {
  const token = getToken(); 

  if (!token) {
    
    throw new Error("Token is missing. Please log in first.");
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + `/armies/${armyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};

const createArmy = async ({
  name,
  faction,
  userId,
}: {
  name: string;
  faction: "Imperium" | "Chaos";
  userId: number;
}) => {
  const token = getToken(); 

  if (!token) {
   
    throw new Error("Token is missing. Please log in first.");
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/armies/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ name, faction, userId }),
  });
};





  
  const ArmyService = {
    getAllArmies,
    getArmyById,
    createArmy,
    
  };
  
  export default ArmyService;
  
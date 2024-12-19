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

const getAllArmies = async () => {
  const token = getToken();

  if (!token) {
    return Promise.reject(new Error("Please log in first."));
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/armies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      return Promise.reject(new Error("Unauthorized. Please log in."));
    } else {
      return Promise.reject(new Error(`Error fetching armies: ${response.statusText}`));
    }
  }

  return response.json(); 
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
  